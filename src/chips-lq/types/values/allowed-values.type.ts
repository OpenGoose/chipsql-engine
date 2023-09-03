import { DataTypes } from "../datatypes/datatypes.enum";

export type DateType = {
  dataType: DataTypes.DATE;
  date: Date;
};

export type DatetimeType = {
  dataType: DataTypes.DATETIME;
  date: Date;
};

export type AllowedValues = string | number | boolean | DateType | DatetimeType;
