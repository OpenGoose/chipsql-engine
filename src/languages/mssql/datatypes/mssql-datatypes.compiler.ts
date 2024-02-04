import { BooleanDataType } from "../../../chips-ql/types/datatypes/datatypes/bit/boolean.datatype";
import { CustomDataType } from "../../../chips-ql/types/datatypes/datatypes/custom/custom.datatype";
import { DateDataType } from "../../../chips-ql/types/datatypes/datatypes/date/date.datatype";
import { BigintDataType } from "../../../chips-ql/types/datatypes/datatypes/numeric/bigint.datatype";
import { ByteDataType } from "../../../chips-ql/types/datatypes/datatypes/numeric/byte.datatype";
import { DecimalDataType } from "../../../chips-ql/types/datatypes/datatypes/numeric/decimal.datatype";
import { IntDataType } from "../../../chips-ql/types/datatypes/datatypes/numeric/int.datatype";
import { VarcharDataType } from "../../../chips-ql/types/datatypes/datatypes/text/varchar.datatype";
import { DataTypeCompiler } from "../../../compiler/datatypes/datatypes-compiler.service";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";

export class MssqlDataTypeCompiler<
  T extends Object
> extends DataTypeCompiler<T> {
  constructor(partsCompiler: MssqlPartsCompiler<T>) {
    super(partsCompiler);
  }

  // Text
  varchar = (datatype: VarcharDataType) =>
    this.buildDataType("VARCHAR", [
      datatype.length === Infinity ? "MAX" : datatype.length?.toString(),
    ]);

  // Number
  byte = (datatype: ByteDataType) => this.buildDataType("TINYINT", [datatype.length?.toString()]);
  int = (datatype: IntDataType) => this.buildDataType("INT", [datatype.length?.toString()]);
  decimal = (datatype: DecimalDataType) => this.buildDataType("DECIMAL", [datatype.length?.toString()]);
  bigint = (datatype: BigintDataType) => this.buildDataType("BIGINT", [datatype.length?.toString()]);

  // Bit
  boolean = (datatype: BooleanDataType) => this.buildDataType("BIT");

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
