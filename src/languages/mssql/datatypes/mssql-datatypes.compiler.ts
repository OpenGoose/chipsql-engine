import { BooleanDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/bit/boolean.datatype";
import { CustomDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/custom/custom.datatype";
import { DateDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/date/date.datatype";
import { NumberDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/numeric/number.datatype";
import { StringDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/text/string.datatype";
import { DataTypeCompiler } from "../../../compiler/datatypes/datatypes-compiler.service";

export class MssqlDataTypeCompiler<
  T extends Object
> extends DataTypeCompiler<T> {
  // Text
  string = (datatype: StringDataTypeOptions) =>
    this.buildDataType("VARCHAR", [
      datatype.length === Infinity ? "MAX" : datatype.length?.toString(),
    ]);

  // Number
  number = (datatype: NumberDataTypeOptions) => this.buildDataType('INT');

  // Bit
  boolean = (datatype: BooleanDataTypeOptions) => this.buildDataType("BIT");

  // Date
  date = (datatype: DateDataTypeOptions) => {
    const name = datatype.includeTime ? "DATETIME2" : "DATE";
    return this.buildDataType(name);
  };

  // Custom
  custom = (dataType: CustomDataTypeOptions<T>) =>
    this.buildDataType(
      dataType.name,
      dataType.parameters.map(this.partsCompiler.value)
    );
}
