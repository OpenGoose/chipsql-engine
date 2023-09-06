import { Functions } from "../../../chips-lq/types/functions/functions.enum";
import { FunctionValue } from "../../../chips-lq/types/values/value.type";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlFunctionsCompiler } from "./mssql-functions.compiler";

export const mssqlFunctions = <T extends Object>(
  funcValue: FunctionValue<T>,
  partsCompiler: MssqlPartsCompiler<T>
) => {
  const funcCompiler: MssqlFunctionsCompiler<T> = new MssqlFunctionsCompiler(
    partsCompiler
  );
  switch (funcValue.function) {
    // Aggregate
    case Functions.COUNT:
      return funcCompiler.count(funcValue);
    case Functions.MAX:
      return funcCompiler.max(funcValue);
    case Functions.MIN:
      return funcCompiler.min(funcValue);

    // Scalar
    case Functions.LOWER:
      return funcCompiler.lower(funcValue);
    case Functions.UPPER:
      return funcCompiler.upper(funcValue);
    case Functions.CONCAT:
      return funcCompiler.concat(funcValue);

    // Conditionals
    case Functions.IF:
      return funcCompiler.if(funcValue);
    case Functions.COALESCE:
      return funcCompiler.coalesce(funcValue);

    // Casting
    case Functions.CAST:
      return funcCompiler.cast(funcValue);

    // Custom
    case Functions.CUSTOM:
      return funcCompiler.custom(funcValue);
  }
  throw new UnavailableFeatureError(funcValue.function);
};
