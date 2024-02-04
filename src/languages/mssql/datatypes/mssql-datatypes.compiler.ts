import { CustomDataType } from "../../../chips-ql/types/datatypes/datatypes/custom/custom.datatype";
import { DateDataType } from "../../../chips-ql/types/datatypes/datatypes/date/date.datatype";
import { VarcharDataType } from "../../../chips-ql/types/datatypes/datatypes/text/varchar.datatype";
import { DataTypesCompiler } from "../../../compiler/datatypes/datatypes-compiler.service";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";

export class MssqlDataTypesCompiler<
  T extends Object
> extends DataTypesCompiler<T> {
  constructor(partsCompiler: MssqlPartsCompiler<T>) {
    super(partsCompiler);
  }

  // Text
  varchar = (datatype: VarcharDataType) =>
    this.buildDataType("VARCHAR", [
      datatype.length === Infinity ? "MAX" : datatype.length?.toString(),
    ]);

  // Number
  int = () => this.buildDataType("INT");
  decimal = () => this.buildDataType("DECIMAL");

  // Bit
  boolean = () => this.buildDataType("BIT");

  // Date
  date = (datatype: DateDataType) => {
    const name = datatype.includeTime ? "DATETIME2" : "DATE";
    return this.buildDataType(name);
  };

  // Custom
  custom = (dataType: CustomDataType<T>) =>
    this.buildDataType(
      dataType.name,
      dataType.parameters.map(this.partsCompiler.value)
    );
}
