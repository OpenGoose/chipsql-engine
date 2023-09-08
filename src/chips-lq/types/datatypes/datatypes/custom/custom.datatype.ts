import { Value } from "../../../values/value.type";
import { DataTypes } from "../../datatypes.enum";

export interface CustomDataType<T extends Object> {
    dataType: DataTypes.CUSTOM;
    name: string;
    parameters: Value<T>[];
}