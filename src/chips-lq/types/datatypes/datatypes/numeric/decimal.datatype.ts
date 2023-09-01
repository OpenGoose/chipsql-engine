import { DataTypes } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface DecimalDataType extends INumericDataType {
    dataType: DataTypes.DECIMAL;
}