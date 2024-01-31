import { Functions } from "../../../chips-ql/types/functions/functions.enum";
import { FunctionValue } from "../../../chips-ql/types/values/value.type";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlFunctionsCompiler } from "./mssql-functions.compiler";

export const mssqlFunctions = <T extends NonNullable<unknown>>(
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
    case Functions.LEFT_SUBSTRING:
      return funcCompiler.leftSubstring(value);
    case Functions.RIGHT_SUBSTRING:
      return funcCompiler.rightSubstring(value);
    case Functions.LENGTH:
      return funcCompiler.length(value);
    case Functions.TRIM:
      return funcCompiler.trim(value);
    case Functions.TRIM_LEFT:
      return funcCompiler.trimLeft(value);
    case Functions.TRIM_RIGHT:
      return funcCompiler.trimRight(value);

    // Scalar - Math
    case Functions.ABS:
      return funcCompiler.abs(value);
    case Functions.CEIL:
      return funcCompiler.ceil(value);
    case Functions.COS:
      return funcCompiler.cos(value);
    case Functions.EXP:
      return funcCompiler.exp(value);
    case Functions.FLOOR:
      return funcCompiler.floor(value);
    case Functions.LOG:
      return funcCompiler.log(value);
    case Functions.PI:
      return funcCompiler.pi();
    case Functions.POWER:
      return funcCompiler.power(value);
    case Functions.ROUND:
      return funcCompiler.round(value);
    case Functions.SIN:
      return funcCompiler.sin(value);
    case Functions.SQRT:
      return funcCompiler.sqrt(value);
    case Functions.TAN:
      return funcCompiler.tan(value);
    
    // Scalar - Time
    case Functions.CURRENT_TIME:
      return funcCompiler.currentTime();
    case Functions.DATE_DIFFERENCE:
      return funcCompiler.dateDifference(value);
    case Functions.DAY:
      return funcCompiler.day(value);
    case Functions.MONTH:
      return funcCompiler.month(value);
    case Functions.YEAR:
      return funcCompiler.year(value);

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
