import { DataType } from "../../../datatypes.enum";
import { NumericRawDataTypes } from "../../list/numeric-raw-datatypes.type";
import { DataTypeOptions } from "../../datatype-options.datatype";

export enum NumberSize {
    SMALL = 'small',
    TINY = 'tiny',
    BIG = 'big'
}

export enum NumberPrecision {
    EXACT = 'exact',
    APPROXIMATE = 'aprox'
}

export type NumberDataTypeOptions = DataTypeOptions<NumericRawDataTypes, DataType.NUMBER, {
    length?: number;
    decimal?: boolean;
    size?: NumberSize;
    precision?: NumberPrecision;
}>;