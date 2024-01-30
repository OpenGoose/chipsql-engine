import { DataType } from "../datatypes/datatypes.enum";
import { DateDataType } from "../datatypes/datatypes/date/date.datatype";

export type DateType = {
  type: DataType.DATE;
  date: Date;
} & Omit<DateDataType, 'dataType'>;

export type AllowedValues =
  | string
  | number
  | boolean
  | DateType
  | null;
