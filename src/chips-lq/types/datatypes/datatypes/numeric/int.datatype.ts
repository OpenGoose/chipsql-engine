import { DataTypes } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface IntDataType extends INumericDataType {
  dataType: DataTypes.INT;
}