import { Table } from "../../../chips-lq/types/tables/table.type";
import { AllowedValues } from "../../../chips-lq/types/values/allowed-values.type";
import {
  FunctionValue,
  Value,
  ValueTypes,
} from "../../../chips-lq/types/values/value.type";
import { UnavailableFeatureError } from "../../features/unavailable-feature.error";
import { joinParts } from "../../utils/query-generation/join-parts.util";
import { format, isDate } from "date-fns";
import { IQueryPartsCompiler } from "../query-parts-compiler.interface";
import { mssqlFunctions } from "../../functions/mssql/mssql-functions";
import { MssqlCompiler } from "./mssql.compiler";
import { QueryTypes } from "../../../chips-lq/types/queries/query.type";
import { Join } from "../../../chips-lq/types/joins/join.type";
import { valueSelector } from "../../utils/selectors/value-selector.util";
import { JoinDirections } from "../../../chips-lq/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../chips-lq/types/joins/join-includes.enum";
import { JoinTypes } from "../../../chips-lq/types/joins/join-types.enum";
import { Select } from "../../../chips-lq/types/queries/select.type";
import { Where } from "../../../chips-lq/types/conditions/where.type";
import { ConditionType } from "../../../chips-lq/types/conditions/condition-type.enum";
import { JoinerOperands } from "../../../chips-lq/types/conditions/operands/joiner-operands.enum";
import { ConditionOperands } from "../../../chips-lq/types/conditions/operands/condition-operands.enum";
import { OrderBy } from "../../../chips-lq/types/order/order-by.type";
import { OrderDirection } from "../../../chips-lq/types/order/order-direction.enum";
import { GroupBy } from "../../../chips-lq/types/grouping/group-by.type";
import { QueryCompilerOptions } from "../query-compiler-options.type";

export class MssqlPartsCompiler<T extends Object>
  implements IQueryPartsCompiler<T>
{
  readonly avoidableSpace: string;

  constructor(public readonly options?: QueryCompilerOptions) {
    this.avoidableSpace = options?.compactQuery ? "" : " ";
  }

  fields = (values: Value<T>[]) =>
    values.map(this.value).join("," + this.avoidableSpace);
  from = (tables: Table<T>[]) =>
    tables.map(this.table).join("," + this.avoidableSpace);
  joins = (joinValues: Join<T>[]) =>
    joinValues.map(this.join).join(this.avoidableSpace);
  orders = (orderValues: OrderBy<T>[]) =>
    orderValues.map(this.orderBy).join("," + this.avoidableSpace);

  // Specific
  value = (value: Value<T>): string => {
    const processValue = () => {
      switch (value.valueType) {
        case ValueTypes.RAW_SQL:
          return value.sql;
        case ValueTypes.RAW_VALUE:
          return this.escape(value.value);
        case ValueTypes.ALL_COLUMNS:
          return joinParts(
            [
              value.tableAlias ? this.generateField(value.tableAlias) : null,
              "*",
            ],
            "."
          );
        case ValueTypes.COLUMN:
          return joinParts(
            [
              value.tableAlias ? this.generateField(value.tableAlias) : null,
              this.generateField(value.field),
            ],
            "."
          );
        case ValueTypes.FUNCTION:
          return this.func(value);
        case ValueTypes.VARIABLE:
          return `@${value.name}`;
        case ValueTypes.SUBSELECT:
          const { alias, distinct, ...query } = value;
          return this.subselect(query);
        case ValueTypes.SET:
          return `(${joinParts(
            value.values.map(this.value),
            "," + this.avoidableSpace
          )})`;
      }
    };

    return joinParts([
      value.distinct ? "DISTINCT" : null,
      processValue(),
      value.alias ? `AS '${value.alias}'` : null,
    ]);
  };

  table = (table: Table<T>) => {
    return joinParts(
      [
        joinParts(
          [
            table.schema ? this.generateField(table.schema) : null,
            this.generateField(table.name),
          ],
          "."
        ),
        table.alias ? this.generateField(table.alias) : null,
      ],
      this.avoidableSpace
    );
  };

  where = (whereValue: Where<T>): string => {
    if (whereValue.conditionType === ConditionType.JOINER) {
      const joiner = valueSelector(
        {
          [JoinerOperands.AND]: "AND",
          [JoinerOperands.OR]: "OR",
        },
        whereValue.joinerOperand
      );
      return `(${joinParts(
        whereValue.conditions.map(this.where),
        this.avoidableSpace + joiner + this.avoidableSpace
      )})`;
    }

    // Logical condition

    const operand = valueSelector(
      {
        [ConditionOperands.EQUALS]: "=",
        [ConditionOperands.EQUALS_OR_GREATER_THAN]: ">=",
        [ConditionOperands.EQUALS_OR_LESS_THAN]: "<=",
        [ConditionOperands.GHREATER_THAN]: ">",
        [ConditionOperands.IN]: "IN",
        [ConditionOperands.LESS_THAN]: "<",
        [ConditionOperands.LIKE]: "LIKE",
        [ConditionOperands.NOT_LIKE]: "NOT LIKE",
        [ConditionOperands.NOT_EQUALS]: "!=",
        [ConditionOperands.NOT_IN]: "NOT IN",
      },
      whereValue.conditionOperand
    );

    return `${joinParts(
      [
        this.value(whereValue.sourceValue),
        operand,
        this.value(whereValue.targetValue),
      ],
      this.avoidableSpace
    )}`;
  };

  join = (joinValue: Join<T>) => {
    const direction = valueSelector(
      {
        [JoinDirections.FULL]: "FULL",
        [JoinDirections.RIGHT]: "RIGHT",
        [JoinDirections.LEFT]: "LEFT",
      },
      joinValue.direction
    );

    const include = valueSelector(
      {
        [JoinIncludes.INNER]: "INNER",
        [JoinIncludes.OUTER]: "OUTER",
      },
      joinValue.include
    );

    const joins =
      joinValue.joinType === JoinTypes.TABLE
        ? this.table(joinValue.table)
        : this.subselect(joinValue.select);

    return joinParts([
      direction,
      include,
      "JOIN",
      joins,
      joinValue.on ? joinParts(["ON", this.where(joinValue.on)]) : null,
    ]);
  };

  subselect = (select: Omit<Select<Object>, "queryType">) => {
    return `(${new MssqlCompiler(
      {
        ...select,
        queryType: QueryTypes.SELECT,
      },
      {
        endWithSemicolon: false,
        ...this.options,
      }
    ).compile()})`;
  };

  grouping = (groupingValues: GroupBy<T>[]) =>
    joinParts(groupingValues.map(this.groupBy), "," + this.avoidableSpace);

  having = (havingValue: Where<T>) => this.where(havingValue);

  orderBy = (orderByValue: OrderBy<T>) => {
    const value =
      typeof orderByValue.field === "number"
        ? orderByValue.field.toString()
        : this.value(orderByValue.field);

    const direction = valueSelector(
      {
        [OrderDirection.ASC]: "ASC",
        [OrderDirection.DESC]: "DESC",
      },
      orderByValue.direction
    );

    return joinParts([value, direction]);
  };

  limit = (limitValue: Value<T>) => this.value(limitValue);
  offset = (offsetValue: Value<T>) => this.value(offsetValue);

  into = (table: Table<Object>) => this.table(table);

  groupBy = (groupByValue: GroupBy<T>) => {
    if (typeof groupByValue === "number") return groupByValue.toString();
    return this.value(groupByValue);
  };

  // Utils
  escape = (value: AllowedValues) => {
    if (isDate(value))
      return format(value as Date, "YYYY-MM-DD hh:mm:ss[.nnnnnnn]");
    switch (typeof value) {
      case "string":
        return `'${value.replace("'", "''")}'`;
      case "boolean":
        return value ? "1" : "0";
      case "number":
      case "bigint":
        return value.toString();
    }
    throw new UnavailableFeatureError(`Conversion to ${typeof value}`);
  };
  generateField = (field: string) => `[${field}]`;

  // Functions
  func = (funcValue: FunctionValue<T>) => {
    return mssqlFunctions(funcValue, this);
  };
}
