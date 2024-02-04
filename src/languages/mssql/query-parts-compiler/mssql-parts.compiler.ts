import { Table } from "../../../chips-ql/types/tables/table.type";
import { AllowedValues } from "../../../chips-ql/types/values/allowed-values.type";
import {
  FunctionValue,
  Value,
  ValueType,
} from "../../../chips-ql/types/values/value.type";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { joinParts } from "../../../compiler/utils/query-generation/join-parts.util";
import { format } from "date-fns";
import { IQueryPartsCompiler } from "../../../compiler/query/query-parts-compiler.interface";
import { MssqlCompiler } from "./mssql.compiler";
import { QueryType } from "../../../chips-ql/types/queries/query.type";
import { Join } from "../../../chips-ql/types/joins/join.type";
import { valueSelector } from "../../../compiler/utils/selectors/value-selector.util";
import { JoinDirection } from "../../../chips-ql/types/joins/join-directions.enum";
import { JoinInclude } from "../../../chips-ql/types/joins/join-includes.enum";
import { JoinType } from "../../../chips-ql/types/joins/join-types.enum";
import { Select } from "../../../chips-ql/types/queries/select.type";
import { Where } from "../../../chips-ql/types/conditions/where.type";
import { ConditionType } from "../../../chips-ql/types/conditions/condition-type.enum";
import { JoinerOperand } from "../../../chips-ql/types/conditions/operands/joiner-operands.enum";
import { ConditionOperand } from "../../../chips-ql/types/conditions/operands/condition-operands.enum";
import { OrderBy } from "../../../chips-ql/types/order/order-by.type";
import { OrderDirection } from "../../../chips-ql/types/order/order-direction.enum";
import { GroupBy } from "../../../chips-ql/types/grouping/group-by.type";
import { QueryCompilerOptions } from "../../../compiler/query/query-compiler-options.type";
import { DataType as DataTypeType } from "../../../chips-ql/types/datatypes/datatypes.enum";
import { mssqlFunction } from "../functions/mssql-functions";
import { mssqlDataType } from "../datatypes/mssql-datatypes";
import { Limit } from "../../../chips-ql/types/limit/limit.type";
import { LimitMode } from "../../../chips-ql/types/limit/limit-mode.enum";
import { LimitOptions } from "../../../chips-ql/types/limit/limit-options.type";
import { Set } from "../../../chips-ql/types/values/set.type";
import { DataType } from "../../../chips-ql/types/datatypes/datatype.type";

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
        case ValueType.RAW_SQL:
          return value.sql;
        case ValueType.RAW_VALUE:
          return this.escape(value.value);
        case ValueType.ALL_COLUMNS:
          return joinParts(
            [
              value.tableAlias ? this.generateField(value.tableAlias) : null,
              "*",
            ],
            "."
          );
        case ValueType.COLUMN:
          return joinParts(
            [
              value.tableAlias ? this.generateField(value.tableAlias) : null,
              this.generateField(value.field),
            ],
            "."
          );
        case ValueType.FUNCTION:
          return this.func(value);
        case ValueType.VARIABLE:
          return `@${value.name}`;
        case ValueType.SUBSELECT: {
          const { alias: _, distinct: __, ...query } = value;
          return this.subselect(query);
        }
        case ValueType.SET:
          return `(${joinParts(
            value.values.map(this.value),
            "," + this.avoidableSpace
          )})`;
      }
    };

    return joinParts([
      value.distinct ? "DISTINCT" : null,
      processValue(),
      value.alias ? `AS ${this.escape(value.alias)}` : null,
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
          [JoinerOperand.AND]: "AND",
          [JoinerOperand.OR]: "OR",
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
        [ConditionOperand.EQUALS]: "=",
        [ConditionOperand.EQUALS_OR_GREATER_THAN]: ">=",
        [ConditionOperand.EQUALS_OR_LESS_THAN]: "<=",
        [ConditionOperand.GREATER_THAN]: ">",
        [ConditionOperand.IN]: "IN",
        [ConditionOperand.LESS_THAN]: "<",
        [ConditionOperand.LIKE]: "LIKE",
        [ConditionOperand.NOT_LIKE]: "NOT LIKE",
        [ConditionOperand.NOT_EQUALS]: "!=",
        [ConditionOperand.NOT_IN]: "NOT IN",
        [ConditionOperand.IS]: "IS",
        [ConditionOperand.IS_NOT]: "IS NOT",
      },
      whereValue.conditionOperand
    );

    return `${joinParts([
      this.value(whereValue.sourceValue),
      operand,
      this.value(whereValue.targetValue),
    ])}`;
  };

  join = (joinValue: Join<T>) => {
    const direction = valueSelector(
      {
        [JoinDirection.FULL]: "FULL",
        [JoinDirection.RIGHT]: "RIGHT",
        [JoinDirection.LEFT]: "LEFT",
      },
      joinValue.direction
    );

    const include = valueSelector(
      {
        [JoinInclude.INNER]: "INNER",
        [JoinInclude.OUTER]: "OUTER",
      },
      joinValue.include
    );

    const joins =
      joinValue.joinType === JoinType.TABLE
        ? this.table(joinValue.table)
        : joinParts([
            this.subselect(joinValue.select),
            this.generateField(joinValue.alias),
          ]);

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
        queryType: QueryType.SELECT,
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

  limit = (limitValue: Limit<T>, options?: LimitOptions) => (options?.valueInParenthesis ? `(${this.value(limitValue.value)})` : this.value(limitValue.value)) + (limitValue.limitMode === LimitMode.PERCENT ? ' PERCENT' : '');
  offset = (offsetValue: Value<T>) => this.value(offsetValue);

  into = (table: Table<Object>) => this.table(table);

  groupBy = (groupByValue: GroupBy<T>) => {
    if (typeof groupByValue === "number") return groupByValue.toString();
    return this.value(groupByValue);
  };

  set = (set: Set<T>) => joinParts(set.map((value) => {
    return this.value({
      ...value,
      valueType: ValueType.COLUMN,
    }) + `${this.avoidableSpace}=${this.avoidableSpace}` + this.value(value.value);
  }));

  dataType = (value: DataType): string => mssqlDataType(value, this);

  // Utils
  escape = (value: AllowedValues) => {
    if (value === null) return "NULL";

    switch (typeof value) {
      case "string":
        return `'${value.replace(/'/g, "''")}'`;
      case "boolean":
        return value ? "1" : "0";
      case "number":
      case "bigint":
        return value.toString();
    }

    switch (value.type) {
      case DataTypeType.DATE:
        if (value.includeTime)
          return `'${format(value.date, "yyyy-MM-dd HH:mm:ss")}'`;
        return `'${format(value.date, "yyyy-MM-dd")}'`;
      default:
        throw new UnavailableFeatureError(`Conversion to ${typeof value}`);
    }
  };
  generateField = (field: string) => `[${field}]`;

  // Function
  func = (funcValue: FunctionValue<T>) => {
    return mssqlFunction(funcValue, this);
  };
}
