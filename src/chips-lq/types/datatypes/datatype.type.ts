import { DecimalDataType } from "./datatypes/numeric/decimal.datatype";
import { IntDataType } from "./datatypes/numeric/int.datatype";
import { VarcharDataType } from "./datatypes/text/varchar.datatype";

export type DataType = VarcharDataType | IntDataType | DecimalDataType;