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
import { AbsFunction } from "./scalar/math/abs.function";
import { CeilFunction } from "./scalar/math/ceil.function";
import { CosFunction } from "./scalar/math/cos.function";
import { ExpFunction } from "./scalar/math/exp.function";
import { FloorFunction } from "./scalar/math/floor.function";
import { LogFunction } from "./scalar/math/log.function";
import { PIFunction } from "./scalar/math/pi.function";
import { PowerFunction } from "./scalar/math/power.function";
import { RoundFunction } from "./scalar/math/round.function";
import { SinFunction } from "./scalar/math/sin.function";
import { SqrtFunction } from "./scalar/math/sqrt.function";
import { TanFunction } from "./scalar/math/tan.function";
import { AsciiFunction } from "./scalar/text/ascii.function";
import { CharFunction } from "./scalar/text/char.function";
import { ConcatFunction } from "./scalar/text/concat.function";
import { DifferenceFunction } from "./scalar/text/difference.function";
import { FindIndexFunction } from "./scalar/text/find-index.function";
import { FormatFunction } from "./scalar/text/format.function";
import { JoinFunction } from "./scalar/text/join.function";
import { LeftSubstringFunction } from "./scalar/text/left-substring.function";
import { LengthFunction } from "./scalar/text/length.function";
import { LowerFunction } from "./scalar/text/lower.function";
import { RightSubstringFunction } from "./scalar/text/right-substring.function";
import { TrimLeftFunction } from "./scalar/text/trim-left.function";
import { TrimRightFunction } from "./scalar/text/trim-right.function";
import { TrimFunction } from "./scalar/text/trim.function";
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
    | LengthFunction<T>
    | TrimFunction<T>
    | TrimLeftFunction<T>
    | TrimRightFunction<T>
    | ConcatFunction<T>

    // Scalar - Math
    | AbsFunction<T>
    | CeilFunction<T>
    | CosFunction<T>
    | ExpFunction<T>
    | FloorFunction<T>
    | LogFunction<T>
    | PIFunction<T>
    | PowerFunction<T>
    | RoundFunction<T>
    | SinFunction<T>
    | SqrtFunction<T>
    | TanFunction<T>

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
