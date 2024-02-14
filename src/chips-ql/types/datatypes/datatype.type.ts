import { BooleanDataTypeOptions } from "./datatypes/options/bit/boolean.datatype";
import { CustomDataTypeOptions } from "./datatypes/options/custom/custom.datatype";
import { DateDataTypeOptions } from "./datatypes/options/date/date.datatype";
import { NumberDataTypeOptions } from "./datatypes/options/numeric/number.datatype";
import { StringDataTypeOptions } from "./datatypes/options/text/string.datatype";

export type DataType<T extends Object = Object> = 
// Text
| StringDataTypeOptions
// Numbers
| NumberDataTypeOptions
// Bit
| BooleanDataTypeOptions
// Date
| DateDataTypeOptions

// Custom
| CustomDataTypeOptions<T>;