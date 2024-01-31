import { Value } from "../../../values/value.type";
import { DataTypes } from "../../datatypes.enum";

export interface CustomDataType<T extends NonNullable<unknown>> {
    dataType: DataTypes.CUSTOM;
    name: string;
    parameters: Value<T>[];
}