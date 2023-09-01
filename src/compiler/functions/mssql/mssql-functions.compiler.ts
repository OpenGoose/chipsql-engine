import { CountFunction } from "../../../chips-lq/types/functions/aggregate/count.function";
import { CustomFunction } from "../../../chips-lq/types/functions/custom/custom.function";
import { joinParts } from "../../utils/query-generation/join-parts.util";
import { FunctionsCompiler } from "../functions-compiler.service";

export class MssqlFunctionsCompiler<
  T extends Object
> extends FunctionsCompiler<T> {
  count = (values: CountFunction<T>) => {
    return `COUNT(${this.partsCompiler.value(values.value)})`;
  };

  custom = (values: CustomFunction<T>) => {
    return `${values.name}(${joinParts(
      values.parameters.map(this.partsCompiler.value),
      ", "
    )})`;
  };
}
