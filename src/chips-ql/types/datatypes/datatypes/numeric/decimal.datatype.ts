import { DataType } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface DecimalDataType extends INumericDataType {
    dataType: DataType.DECIMAL;
}