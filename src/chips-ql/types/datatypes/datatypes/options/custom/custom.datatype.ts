import { Value } from "../../../../values/value.type";
import { DataType } from "../../../datatypes.enum";

export interface CustomDataTypeOptions<T extends Object> {
    dataType: DataType.CUSTOM;
    name: string;
    parameters: Value<T>[];
}