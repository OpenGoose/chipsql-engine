import { CountFunction } from "../../../chips-lq/types/functions/aggregate/count.function";
import { CustomFunction } from "../../../chips-lq/types/functions/custom/custom.function";
import { IQueryPartsCompiler } from "../../query/query-parts-compiler.interface";
import { joinParts } from "../../utils/query-generation/join-parts.util";
import { FunctionsCompiler } from "../functions-compiler.service";

export class MssqlFunctionsCompiler<
  T extends Object
> extends FunctionsCompiler<T> {
  constructor(protected readonly partsCompiler: IQueryPartsCompiler<T>) {
    super(
      partsCompiler,
      (name, parameters) => `${name}(${joinParts(parameters, ", ")})`
    );
  }

  count = (values: CountFunction<T>) => {
    return this.buildFunction("COUNT", [
      this.partsCompiler.value(values.value),
    ]);
  };

  custom = (values: CustomFunction<T>) => {
    return this.buildFunction(
      values.name,
      values.parameters.map(this.partsCompiler.value)
    );
  };
}
