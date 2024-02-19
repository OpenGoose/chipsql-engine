import { DataType } from "../datatypes/datatypes.enum";
import { DateDataTypeOptions } from "../datatypes/datatypes/options/date/date.datatype";

export type DateType = {
  type: DataType.DATE;
  includeTime?: boolean;
  date: Date;
} & Omit<DateDataTypeOptions, 'dataType'>;

export type AllowedValues =
  | string
  | number
  | boolean
  | DateType
  | null;
