import { DataType } from "../datatypes/datatypes.enum";
import { DateDataTypeOptions } from "../datatypes/datatypes/options/date/date.datatype";

export type DateType = {
  type: DataType.DATE;
  date: Date;
} & Omit<DateDataTypeOptions, 'dataType'>;

export type AllowedValues =
  | string
  | number
  | boolean
  | DateType
  | null;
