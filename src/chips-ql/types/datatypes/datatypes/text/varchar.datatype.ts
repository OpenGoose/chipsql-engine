import { DataType } from "../../datatypes.enum";
import { ITextDataType } from "./text.datatype.interface";

export interface VarcharDataType extends ITextDataType {
  dataType: DataType.VARCHAR;
}