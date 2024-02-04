import { DataType } from "../../datatypes.enum";
import { INumericDataType } from "./numeric.datatype.interface";

export interface ByteDataType extends INumericDataType {
    dataType: DataType.BYTE;
}