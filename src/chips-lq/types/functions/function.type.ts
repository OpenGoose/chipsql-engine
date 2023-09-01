import { CountFunction } from "./aggregate/count.function";
import { MaxFunction } from "./aggregate/max.function.type";
import { MinFunction } from "./aggregate/min.function.type";
import { CustomFunction } from "./custom/custom.function";
import { CastFunction } from "./scalar/casting/cast.function";
import { CoalesceFunction } from "./scalar/conditionals/coalesce.function";
import { IfFunction } from "./scalar/conditionals/if.function";
import { ConcatFunction } from "./scalar/text/concat.function";
import { LowerFunction } from "./scalar/text/lower.function";
import { UpperFunction } from "./scalar/text/upper.function";

type FunctionProps = {
  alias?: string;
};

export type Function<T extends Object> = FunctionProps &
  (
    // Aggregate
    | MaxFunction<T>
    | MinFunction<T>
    | CountFunction<T>

    // Scalar
    | LowerFunction<T>
    | UpperFunction<T>
    | ConcatFunction<T>

    // Conditionals
    | IfFunction<T>
    | CoalesceFunction<T>

    // Casting
    | CastFunction<T>

    // Custom
    | CustomFunction<T>
  );
