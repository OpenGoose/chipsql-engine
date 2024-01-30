import { DataType } from "../../datatypes.enum";
import { IBitDataType } from "./bit.datatype.interface";

export interface BooleanDataType extends IBitDataType {
    dataType: DataType.BOOLEAN;
    value: boolean | 1 | 0;
}