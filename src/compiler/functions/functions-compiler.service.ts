import { CountFunction } from "../../chips-lq/types/functions/aggregate/count.function";
import { MaxFunction } from "../../chips-lq/types/functions/aggregate/max.function.type";
import { MinFunction } from "../../chips-lq/types/functions/aggregate/min.function.type";
import { CustomFunction } from "../../chips-lq/types/functions/custom/custom.function";
import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";

export abstract class FunctionsCompiler<T extends Object> {
  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildFunction: (
      name: string,
      parameters: string[]
    ) => string
  ) {}

  abstract custom: (values: CustomFunction<T>) => string;
  abstract count: (values: CountFunction<T>) => string;
  abstract max: (values: MaxFunction<T>) => string;
  abstract min: (values: MinFunction<T>) => string;
}
