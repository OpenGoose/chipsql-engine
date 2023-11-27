import { DataTypes } from "../../datatypes.enum";
import { IBitDataType } from "./bit.datatype.interface";

export interface BooleanDataType extends IBitDataType {
    dataType: DataTypes.BOOLEAN;
    value: boolean | 1 | 0;
}