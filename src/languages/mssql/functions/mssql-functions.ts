import { Functions } from "../../../chips-ql/types/functions/functions.enum";
import { FunctionValue } from "../../../chips-ql/types/values/value.type";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlFunctionsCompiler } from "./mssql-functions.compiler";

export const mssqlFunctions = <T extends Object>(
  value: FunctionValue<T>,
  partsCompiler: MssqlPartsCompiler<T>
) => {
  const funcCompiler: MssqlFunctionsCompiler<T> = new MssqlFunctionsCompiler<T>(
    partsCompiler
  );
  switch (value.function) {
    // Aggregate
    case Functions.COUNT:
      return funcCompiler.count(value);
    case Functions.MAX:
      return funcCompiler.max(value);
    case Functions.MIN:
      return funcCompiler.min(value);

    // Scalar
    case Functions.ASCII:
      return funcCompiler.ascii(value);
    case Functions.CHAR:
      return funcCompiler.char(value);
    case Functions.FIND_INDEX:
      return funcCompiler.findIndex(value);
    case Functions.JOIN:
      return funcCompiler.join(value);
    case Functions.LOWER:
      return funcCompiler.lower(value);
    case Functions.UPPER:
      return funcCompiler.upper(value);
    case Functions.CONCAT:
      return funcCompiler.concat(value);
    case Functions.DIFFERENCE:
      return funcCompiler.difference(value);
    case Functions.FORMAT:
      return funcCompiler.format(value);

    // Bytes
    case Functions.BYTES_LENGTH:
      return funcCompiler.bytesLength(value);

    // Conditionals
    case Functions.IF:
      return funcCompiler.if(value);
    case Functions.COALESCE:
      return funcCompiler.coalesce(value);
    case Functions.IF_NULL:
      return funcCompiler.ifNull(value);

    // Casting
    case Functions.CAST:
      return funcCompiler.cast(value);
    case Functions.CONVERT:
      return funcCompiler.convert(value);

    // Custom
    case Functions.CUSTOM:
      return funcCompiler.custom(value);

    default:
      throw new UnavailableFeatureError(value);
  }
};
