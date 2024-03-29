import { DataType as DataTypeType } from "../../../chips-ql/types/datatypes/datatype.type";
import { DataType } from "../../../chips-ql/types/datatypes/datatypes.enum";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { MssqlDataTypeCompiler } from "./mssql-datatypes.compiler";

export const mssqlDataType = <T extends Object>(
  value: DataTypeType,
  partsCompiler: MssqlPartsCompiler<T>
) => {
  const compiler = new MssqlDataTypeCompiler<T>(partsCompiler);

  switch (value.dataType) {
    // Text
    case DataType.STRING:
      return compiler.string(value);
    // Number
    case DataType.NUMBER:
      return compiler.number(value);

    // Bit
    case DataType.BOOLEAN:
      return compiler.boolean(value);

    // Date
    case DataType.DATE:
      return compiler.date(value);

    // Custom
    case DataType.CUSTOM:
      return compiler.custom(value);
    default:
      throw new UnavailableFeatureError(value);
  }
};
