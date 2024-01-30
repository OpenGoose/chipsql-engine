import { DataType } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface IntDataType extends INumericDataType {
  dataType: DataType.INT;
}