import { DataType } from "../../../datatypes.enum";
import { NumericRawDataTypes } from "../../list/numeric-raw-datatypes.type";
import { DataTypeOptions } from "../../datatype-options.datatype";


export type NumberDataTypeOptions = DataTypeOptions<NumericRawDataTypes, DataType.NUMBER, {
    length?: number;
}>;