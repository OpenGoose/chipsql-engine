import { DataType } from "../../../datatypes.enum";
import { DataTypeOptions } from "../../datatype-options.datatype";
import { BitRawDataTypes } from "../../list/bit-raw-datatypes";

export type BooleanDataTypeOptions = DataTypeOptions<BitRawDataTypes, DataType.BOOLEAN, {}>;