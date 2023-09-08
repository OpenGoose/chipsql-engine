import { DataTypes } from "../datatypes/datatypes.enum";
import { DateDataType } from "../datatypes/datatypes/date/date.datatype";

export type DateType = {
  type: DataTypes.DATE;
  date: Date;
} & Omit<DateDataType, 'dataType'>;

export type AllowedValues =
  | string
  | number
  | boolean
  | DateType
  | null;
