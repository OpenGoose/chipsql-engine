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
import { Query, QueryTypes } from "../../../chips-lq/types/queries/query.type";

export class MssqlPartsCompiler<T extends Object>
  implements IQueryPartsCompiler<T>
{
  fields = (values: Value<T>[]) => values.map(this.value).join(", ");
  from = (tables: Table<T>[]) => tables.map(this.table).join(", ");

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
          return `(${new MssqlCompiler(
            {
              ...query,
              queryType: QueryTypes.SELECT,
            },
            {
              semicolon: false,
            }
          ).compile()})`;
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
