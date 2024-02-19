import { DataType } from "../../../datatypes.enum";
import { DataTypeOptions } from "../../datatype-options.datatype";
import { DateRawDataTypes } from "../../list/date-raw-datatypes.type";

export type DateDataTypeOptions = DataTypeOptions<DateRawDataTypes, DataType.DATE, {includeTime?: boolean;}>;