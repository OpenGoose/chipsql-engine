import { DataType } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface BigintDataType extends INumericDataType {
    dataType: DataType.BIGINT;
}