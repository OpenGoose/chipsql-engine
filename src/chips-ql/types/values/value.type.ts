import { Function } from "../functions/function.type";
import { Select } from "../queries/select.type";
import { AllowedValues } from "./allowed-values.type";

type ColumnField = {
  tableAlias?: string;
  field: string;
};

export type ColumnarValue<T extends Object> = {
  valueType: ValueTypes.COLUMN;
} & ColumnField;

export type AllColumnsValue<T extends Object> = {
  valueType: ValueTypes.ALL_COLUMNS;
} & Omit<ColumnarValue<T>, "valueType" | "alias" | "field" | "distinct">;

export type RawValue<T extends Object> = {
  valueType: ValueTypes.RAW_VALUE;
  value: AllowedValues;
};

export type FunctionValue<T extends Object> = {
  valueType: ValueTypes.FUNCTION;
} & Function<T>;

export type SubselectValue<T extends Object = Object> = Omit<
  Select<T>,
  "queryType"
> & { valueType: ValueTypes.SUBSELECT };

export type VariableType<T extends Object> = {
  valueType: ValueTypes.VARIABLE;
  name: string;
};

export type RawSql = {
  valueType: ValueTypes.RAW_SQL;
  sql: string;
};

export type SetType<T extends Object> = {
  valueType: ValueTypes.SET;
  values: Value<T>[];
};

export type Value<T extends Object> = (
  | ColumnarValue<T>
  | AllColumnsValue<T>
  | RawValue<T>
  | FunctionValue<T>
  | SubselectValue
  | RawSql
  | VariableType<T>
  | SetType<T>
) & { alias?: string; distinct?: boolean };

export enum ValueTypes {
  COLUMN = "col",
  ALL_COLUMNS = "allcols",
  RAW_VALUE = "rv",
  FUNCTION = "fn",
  SUBSELECT = "ss",
  VARIABLE = "var",
  RAW_SQL = "sql",
  SET = "set",
}
