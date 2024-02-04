import { BooleanDataType } from "./datatypes/bit/boolean.datatype";
import { CustomDataType } from "./datatypes/custom/custom.datatype";
import { DateDataType } from "./datatypes/date/date.datatype";
import { BigintDataType } from "./datatypes/numeric/bigint.datatype";
import { ByteDataType } from "./datatypes/numeric/byte.datatype";
import { DecimalDataType } from "./datatypes/numeric/decimal.datatype";
import { IntDataType } from "./datatypes/numeric/int.datatype";
import { VarcharDataType } from "./datatypes/text/varchar.datatype";

export type DataType<T extends Object = Object> = 
// Text
| VarcharDataType
// Numbers
| ByteDataType
| IntDataType
| DecimalDataType
| BigintDataType
// Bit
| BooleanDataType
// Date
| DateDataType

// Custom
| CustomDataType<T>;