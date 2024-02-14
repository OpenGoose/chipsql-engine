import { DataType } from "../../../datatypes.enum";
import { NumericDataTypes } from "../../list/numeric-raw-datatypes.type";
import { RawDatatypeOptions } from "../../raw-datatype.datatype";


export type NumberDataTypeOptions = RawDatatypeOptions<NumericDataTypes, DataType.NUMBER, {
    length?: number;
}>;