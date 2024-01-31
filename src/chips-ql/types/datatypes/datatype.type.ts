import { BooleanDataType } from "./datatypes/bit/boolean.datatype";
import { CustomDataType } from "./datatypes/custom/custom.datatype";
import { DateDataType } from "./datatypes/date/date.datatype";
import { DecimalDataType } from "./datatypes/numeric/decimal.datatype";
import { IntDataType } from "./datatypes/numeric/int.datatype";
import { VarcharDataType } from "./datatypes/text/varchar.datatype";

export type DataType<T extends NonNullable<unknown> = NonNullable<unknown>> = 
// Text
| VarcharDataType
// Numbers
| IntDataType
| DecimalDataType
// Bit
| BooleanDataType
// Date
| DateDataType

// Custom
| CustomDataType<T>;