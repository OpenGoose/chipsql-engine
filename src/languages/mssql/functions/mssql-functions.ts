import { Function } from "../../../chips-ql/types/functions/functions.enum";
import { FunctionValue } from "../../../chips-ql/types/values/value.type";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlFunctionCompiler } from "./mssql-functions.compiler";

export const mssqlFunction = <T extends Object>(
  value: FunctionValue<T>,
  partsCompiler: MssqlPartsCompiler<T>
) => {
  const funcCompiler: MssqlFunctionCompiler<T> = new MssqlFunctionCompiler<T>(
    partsCompiler
  );
  switch (value.function) {
    // Aggregate
    case Function.COUNT:
      return funcCompiler.count(value);
    case Function.MAX:
      return funcCompiler.max(value);
    case Function.MIN:
      return funcCompiler.min(value);

    // Scalar
    case Function.ASCII:
      return funcCompiler.ascii(value);
    case Function.CHAR:
      return funcCompiler.char(value);
    case Function.FIND_INDEX:
      return funcCompiler.findIndex(value);
    case Function.JOIN:
      return funcCompiler.join(value);
    case Function.LOWER:
      return funcCompiler.lower(value);
    case Function.UPPER:
      return funcCompiler.upper(value);
    case Function.CONCAT:
      return funcCompiler.concat(value);
    case Function.DIFFERENCE:
      return funcCompiler.difference(value);
    case Function.FORMAT:
      return funcCompiler.format(value);
    case Function.LEFT_SUBSTRING:
      return funcCompiler.leftSubstring(value);
    case Function.RIGHT_SUBSTRING:
      return funcCompiler.rightSubstring(value);
    case Function.LENGTH:
      return funcCompiler.length(value);
    case Function.TRIM:
      return funcCompiler.trim(value);
    case Function.TRIM_LEFT:
      return funcCompiler.trimLeft(value);
    case Function.TRIM_RIGHT:
      return funcCompiler.trimRight(value);

    // Scalar - Math
    case Function.ABS:
      return funcCompiler.abs(value);
    case Function.CEIL:
      return funcCompiler.ceil(value);
    case Function.COS:
      return funcCompiler.cos(value);
    case Function.EXP:
      return funcCompiler.exp(value);
    case Function.FLOOR:
      return funcCompiler.floor(value);
    case Function.LOG:
      return funcCompiler.log(value);
    case Function.PI:
      return funcCompiler.pi();
    case Function.POWER:
      return funcCompiler.power(value);
    case Function.ROUND:
      return funcCompiler.round(value);
    case Function.SIN:
      return funcCompiler.sin(value);
    case Function.SQRT:
      return funcCompiler.sqrt(value);
    case Function.TAN:
      return funcCompiler.tan(value);
    
    // Scalar - Time
    case Function.CURRENT_TIME:
      return funcCompiler.currentTime();
    case Function.DATE_DIFFERENCE:
      return funcCompiler.dateDifference(value);
    case Function.DAY:
      return funcCompiler.day(value);
    case Function.MONTH:
      return funcCompiler.month(value);
    case Function.YEAR:
      return funcCompiler.year(value);

    // Bytes
    case Function.BYTES_LENGTH:
      return funcCompiler.bytesLength(value);

    // Conditionals
    case Function.IF:
      return funcCompiler.if(value);
    case Function.COALESCE:
      return funcCompiler.coalesce(value);
    case Function.IF_NULL:
      return funcCompiler.ifNull(value);

    // Casting
    case Function.CAST:
      return funcCompiler.cast(value);
    case Function.CONVERT:
      return funcCompiler.convert(value);

    // Custom
    case Function.CUSTOM:
      return funcCompiler.custom(value);

    default:
      throw new UnavailableFeatureError(value);
  }
};
