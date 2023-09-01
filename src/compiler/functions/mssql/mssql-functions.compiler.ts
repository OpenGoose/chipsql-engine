import { CountFunction } from "../../../chips-lq/types/functions/aggregate/count.function";
import { FunctionsCompiler } from "../functions-compiler.service";

export class MssqlFunctionsCompiler<
  T extends Object
> extends FunctionsCompiler<T> {
  count = (values: CountFunction<T>) => {
    return `COUNT(${this.partsCompiler.value(values.value)})`;
  };
}
