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
          return "*";
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

    return joinParts([direction, include, joins, "ON"]);
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
