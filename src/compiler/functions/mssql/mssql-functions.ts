import { Functions } from "../../../chips-lq/types/functions/functions.enum";
import { FunctionValue } from "../../../chips-lq/types/values/value.type";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlPartsCompiler } from "../../query/mssql/mssql-parts.compiler";
import { MssqlFunctionsCompiler } from "./mssql-functions.compiler";

export const mssqlFunctions = <T extends Object>(
  funcValue: FunctionValue<T>,
  partsCompiler: MssqlPartsCompiler<T>
) => {
  const funcCompiler: MssqlFunctionsCompiler<T> = new MssqlFunctionsCompiler(
    partsCompiler
  );
  switch (funcValue.function) {
    case Functions.COUNT:
      return funcCompiler.count(funcValue);
    case Functions.CUSTOM:
      return funcCompiler.custom(funcValue);
    case Functions.MAX:
      return funcCompiler.max(funcValue);
    case Functions.MIN:
      return funcCompiler.min(funcValue);
  }
  throw new UnavailableFeatureError(funcValue.function);
};
