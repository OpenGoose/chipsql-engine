import { DataType } from "../../../datatypes.enum";
import { DataTypeOptions } from "../../datatype-options.datatype";
import { StringRawDataTypes } from "../../list/string-raw-datatypes.type";

export type StringDataTypeOptions = DataTypeOptions<StringRawDataTypes, DataType.STRING, {
  dataType: DataType.STRING;

  length?: number;
}>;