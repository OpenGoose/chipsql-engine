import { CountFunction } from "../../chips-lq/types/functions/aggregate/count.function";
import { MaxFunction } from "../../chips-lq/types/functions/aggregate/max.function.type";
import { MinFunction } from "../../chips-lq/types/functions/aggregate/min.function.type";
import { CustomFunction } from "../../chips-lq/types/functions/custom/custom.function";
import { CastFunction } from "../../chips-lq/types/functions/scalar/casting/cast.function";
import { CoalesceFunction } from "../../chips-lq/types/functions/scalar/conditionals/coalesce.function";
import { IfFunction } from "../../chips-lq/types/functions/scalar/conditionals/if.function";
import { ConcatFunction } from "../../chips-lq/types/functions/scalar/text/concat.function";
import { LowerFunction } from "../../chips-lq/types/functions/scalar/text/lower.function";
import { UpperFunction } from "../../chips-lq/types/functions/scalar/text/upper.function";
import { Value } from "../../chips-lq/types/values/value.type";
import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";
import { joinParts } from "../utils/query-generation/join-parts.util";

export abstract class FunctionsCompiler<T extends Object> {
  protected readonly value: (value: Value<T>) => string;

  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildFunction: (
      name: string,
      parameters: string[]
    ) => string = (name: string, parameters: string[]) =>
      `${name}(${joinParts(parameters, `,${partsCompiler.avoidableSpace}`)})`
  ) {
    this.value = partsCompiler.value;
  }

  // Aggregate
  abstract count: (values: CountFunction<T>) => string;
  abstract max: (values: MaxFunction<T>) => string;
  abstract min: (values: MinFunction<T>) => string;

  // Scalar
  abstract lower: (values: LowerFunction<T>) => void;
  abstract upper: (values: UpperFunction<T>) => void;
  abstract concat: (values: ConcatFunction<T>) => void;

  // Conditionals
  abstract if: (values: IfFunction<T>) => void;
  abstract coalesce: (values: CoalesceFunction<T>) => void;

  // Casting
  abstract cast: (values: CastFunction<T>) => void;

  // Custom
  abstract custom: (values: CustomFunction<T>) => string;
}
