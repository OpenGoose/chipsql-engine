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

export class MssqlPartsCompiler<T extends Object>
  implements IQueryPartsCompiler<T>
{
  fields = (values: Value<T>[]) => values.map(this.value).join(", ");
  from = (tables: Table<T>[]) => tables.map(this.table).join(", ");
  joins = (joinValues: Join<T>[]) => joinValues.map(this.join).join(" ");

  // Specific
  value = (value: Value<T>) => {
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
      }
      throw new UnavailableFeatureError(value.valueType);
    };

    return joinParts([
      value.distinct ? "DISTINCT" : null,
      processValue(),
      value.alias ? `AS '${value.alias}'` : null,
    ]);
  };

  table = (table: Table<T>) => {
    return joinParts([
      joinParts(
        [
          table.schema ? this.generateField(table.schema) : null,
          this.generateField(table.name),
        ],
        "."
      ),
      table.alias ? this.generateField(table.alias) : null,
    ]);
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
        ` ${joiner} `
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

    return `(${joinParts([
      this.value(whereValue.sourceValue),
      operand,
      this.value(whereValue.targetValue),
    ])})`;
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
        semicolon: false,
      }
    ).compile()})`;
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
