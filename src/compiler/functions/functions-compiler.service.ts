import { CountFunction } from "../../chips-ql/types/functions/aggregate/count.function";
import { MaxFunction } from "../../chips-ql/types/functions/aggregate/max.function.type";
import { MinFunction } from "../../chips-ql/types/functions/aggregate/min.function.type";
import { CustomFunction } from "../../chips-ql/types/functions/custom/custom.function";
import { BytesLengthFunction } from "../../chips-ql/types/functions/scalar/bytes/bytes-length.function";
import { CastFunction } from "../../chips-ql/types/functions/scalar/casting/cast.function";
import { ConvertFunction } from "../../chips-ql/types/functions/scalar/casting/convert.function";
import { CoalesceFunction } from "../../chips-ql/types/functions/scalar/conditionals/coalesce.function";
import { IfNullFunction } from "../../chips-ql/types/functions/scalar/conditionals/if-null.function";
import { IfFunction } from "../../chips-ql/types/functions/scalar/conditionals/if.function";
import { AbsFunction } from "../../chips-ql/types/functions/scalar/math/abs.function";
import { CeilFunction } from "../../chips-ql/types/functions/scalar/math/ceil.function";
import { CosFunction } from "../../chips-ql/types/functions/scalar/math/cos.function";
import { ExpFunction } from "../../chips-ql/types/functions/scalar/math/exp.function";
import { FloorFunction } from "../../chips-ql/types/functions/scalar/math/floor.function";
import { LogFunction } from "../../chips-ql/types/functions/scalar/math/log.function";
import { PIFunction } from "../../chips-ql/types/functions/scalar/math/pi.function";
import { PowerFunction } from "../../chips-ql/types/functions/scalar/math/power.function";
import { RoundFunction } from "../../chips-ql/types/functions/scalar/math/round.function";
import { SinFunction } from "../../chips-ql/types/functions/scalar/math/sin.function";
import { SqrtFunction } from "../../chips-ql/types/functions/scalar/math/sqrt.function";
import { TanFunction } from "../../chips-ql/types/functions/scalar/math/tan.function";
import { AsciiFunction } from "../../chips-ql/types/functions/scalar/text/ascii.function";
import { CharFunction } from "../../chips-ql/types/functions/scalar/text/char.function";
import { ConcatFunction } from "../../chips-ql/types/functions/scalar/text/concat.function";
import { DifferenceFunction } from "../../chips-ql/types/functions/scalar/text/difference.function";
import { FindIndexFunction } from "../../chips-ql/types/functions/scalar/text/find-index.function";
import { FormatFunction } from "../../chips-ql/types/functions/scalar/text/format.function";
import { JoinFunction } from "../../chips-ql/types/functions/scalar/text/join.function";
import { LeftSubstringFunction } from "../../chips-ql/types/functions/scalar/text/left-substring.function";
import { LengthFunction } from "../../chips-ql/types/functions/scalar/text/length.function";
import { LowerFunction } from "../../chips-ql/types/functions/scalar/text/lower.function";
import { RightSubstringFunction } from "../../chips-ql/types/functions/scalar/text/right-substring.function";
import { TrimLeftFunction } from "../../chips-ql/types/functions/scalar/text/trim-left.function";
import { TrimRightFunction } from "../../chips-ql/types/functions/scalar/text/trim-right.function";
import { TrimFunction } from "../../chips-ql/types/functions/scalar/text/trim.function";
import { UpperFunction } from "../../chips-ql/types/functions/scalar/text/upper.function";
import { CurrentTimeFunction } from "../../chips-ql/types/functions/scalar/time/current-time.function";
import { DateDifferenceFunction } from "../../chips-ql/types/functions/scalar/time/date-difference.function";
import { DayFunction } from "../../chips-ql/types/functions/scalar/time/day.function";
import { MonthFunction } from "../../chips-ql/types/functions/scalar/time/month.function";
import { YearFunction } from "../../chips-ql/types/functions/scalar/time/year.function";
import { Value } from "../../chips-ql/types/values/value.type";
import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";
import { joinParts } from "../utils/query-generation/join-parts.util";

export abstract class FunctionsCompiler<T extends Object> {
  protected readonly value: (value: Value<T>) => string;

  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildFunction: (
      name: string,
      parameters: (string | null | undefined)[]
    ) => string = (name, parameters) =>
      `${name}(${joinParts(parameters, `,${partsCompiler.avoidableSpace}`)})`
  ) {
    this.value = partsCompiler.value;
  }

  // Aggregate
  abstract count: (values: CountFunction<T>) => string;
  abstract max: (values: MaxFunction<T>) => string;
  abstract min: (values: MinFunction<T>) => string;

  // Scalar
  abstract ascii: (values: AsciiFunction<T>) => string;
  abstract char: (values: CharFunction<T>) => string;
  abstract findIndex: (values: FindIndexFunction<T>) => string;
  abstract join: (values: JoinFunction<T>) => string;
  abstract lower: (values: LowerFunction<T>) => string;
  abstract upper: (values: UpperFunction<T>) => string;
  abstract difference: (values: DifferenceFunction<T>) => string;
  abstract format: (values: FormatFunction<T>) => string;
  abstract concat: (values: ConcatFunction<T>) => string;
  abstract leftSubstring: (values: LeftSubstringFunction<T>) => string;
  abstract rightSubstring: (values: RightSubstringFunction<T>) => string;
  abstract length: (value: LengthFunction<T>) => string;
  abstract trim: (value: TrimFunction<T>) => string;
  abstract trimRight: (value: TrimRightFunction<T>) => string;
  abstract trimLeft: (value: TrimLeftFunction<T>) => string;

  // Scalar - Math
  abstract abs: (value: AbsFunction<T>) => string;
  abstract ceil: (value: CeilFunction<T>) => string;
  abstract cos: (value: CosFunction<T>) => string;
  abstract exp: (value: ExpFunction<T>) => string;
  abstract floor: (value: FloorFunction<T>) => string;
  abstract log: (value: LogFunction<T>) => string;
  abstract pi: (value: PIFunction<T>) => string;
  abstract power: (value: PowerFunction<T>) => string;
  abstract round: (value: RoundFunction<T>) => string;
  abstract sin: (value: SinFunction<T>) => string;
  abstract sqrt: (value: SqrtFunction<T>) => string;
  abstract tan: (value: TanFunction<T>) => string;

  // Scalar - Time
  abstract currentTime: (value: CurrentTimeFunction<T>) => string;
  abstract dateDifference: (value: DateDifferenceFunction<T>) => string;
  abstract day: (value: DayFunction<T>) => string;
  abstract month: (value: MonthFunction<T>) => string;
  abstract year: (value: YearFunction<T>) => string;

  // Bytes
  abstract bytesLength: (values: BytesLengthFunction<T>) => string;

  // Conditionals
  abstract if: (values: IfFunction<T>) => string;
  abstract coalesce: (values: CoalesceFunction<T>) => string;
  abstract ifNull: (values: IfNullFunction<T>) => string;

  // Casting
  abstract cast: (values: CastFunction<T>) => string;
  abstract convert: (values: ConvertFunction<T>) => string;

  // Custom
  abstract custom: (values: CustomFunction<T>) => string;
}
