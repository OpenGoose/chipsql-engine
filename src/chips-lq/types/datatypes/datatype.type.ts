import { BooleanDataType } from "./datatypes/bit/boolean.datatype";
import { DateDataType } from "./datatypes/date/date.datatype";
import { DecimalDataType } from "./datatypes/numeric/decimal.datatype";
import { IntDataType } from "./datatypes/numeric/int.datatype";
import { VarcharDataType } from "./datatypes/text/varchar.datatype";

export type DataType = 
// Text
| VarcharDataType
// Numbers
| IntDataType
| DecimalDataType
// Bit
| BooleanDataType
// Date
| DateDataType;