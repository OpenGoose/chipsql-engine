import { CountFunction } from "./aggregate/count.function";
import { MaxFunction } from "./aggregate/max.function.type";
import { MinFunction } from "./aggregate/min.function.type";
import { CustomFunction } from "./custom/custom.function";
import { BytesLengthFunction } from "./scalar/bytes/bytes-length.function";
import { CastFunction } from "./scalar/casting/cast.function";
import { ConvertFunction } from "./scalar/casting/convert.function";
import { CoalesceFunction } from "./scalar/conditionals/coalesce.function";
import { IfNullFunction } from "./scalar/conditionals/if-null.function";
import { IfFunction } from "./scalar/conditionals/if.function";
import { AsciiFunction } from "./scalar/text/ascii.function";
import { CharFunction } from "./scalar/text/char.function";
import { ConcatFunction } from "./scalar/text/concat.function";
import { DifferenceFunction } from "./scalar/text/difference.function";
import { FindIndexFunction } from "./scalar/text/find-index.function";
import { FormatFunction } from "./scalar/text/format.function";
import { JoinFunction } from "./scalar/text/join.function";
import { LeftSubstringFunction } from "./scalar/text/left-substring.function";
import { LowerFunction } from "./scalar/text/lower.function";
import { RightSubstringFunction } from "./scalar/text/right-substring.function";
import { UpperFunction } from "./scalar/text/upper.function";

type FunctionProps = {
  alias?: string;
};

export type Function<T extends Object> = FunctionProps &
  // Aggregate
  (| MaxFunction<T>
    | MinFunction<T>
    | CountFunction<T>

    // Scalar
    | AsciiFunction<T>
    | CharFunction<T>
    | FindIndexFunction<T>
    | JoinFunction<T>
    | LowerFunction<T>
    | UpperFunction<T>
    | DifferenceFunction<T>
    | FormatFunction<T>
    | LeftSubstringFunction<T>
    | RightSubstringFunction<T>
    | ConcatFunction<T>

    // Bytes
    | BytesLengthFunction<T>

    // Conditionals
    | IfFunction<T>
    | CoalesceFunction<T>
    | IfNullFunction<T>

    // Casting
    | CastFunction<T>
    | ConvertFunction<T>

    // Custom
    | CustomFunction<T>
  );
