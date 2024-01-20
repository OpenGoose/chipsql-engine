import { CountFunction } from "../../../chips-ql/types/functions/aggregate/count.function";
import { MaxFunction } from "../../../chips-ql/types/functions/aggregate/max.function.type";
import { MinFunction } from "../../../chips-ql/types/functions/aggregate/min.function.type";
import { CustomFunction } from "../../../chips-ql/types/functions/custom/custom.function";
import { IQueryPartsCompiler } from "../../../compiler/query/query-parts-compiler.interface";
import { FunctionsCompiler } from "../../../compiler/functions/functions-compiler.service";
import { CastFunction } from "../../../chips-ql/types/functions/scalar/casting/cast.function";
import { IfNullFunction } from "../../../chips-ql/types/functions/scalar/conditionals/if-null.function";
import { IfFunction } from "../../../chips-ql/types/functions/scalar/conditionals/if.function";
import { ConcatFunction } from "../../../chips-ql/types/functions/scalar/text/concat.function";
import { LowerFunction } from "../../../chips-ql/types/functions/scalar/text/lower.function";
import { UpperFunction } from "../../../chips-ql/types/functions/scalar/text/upper.function";
import { AsciiFunction } from "../../../chips-ql/types/functions/scalar/text/ascii.function";
import { CharFunction } from "../../../chips-ql/types/functions/scalar/text/char.function";
import { FindIndexFunction } from "../../../chips-ql/types/functions/scalar/text/find-index.function";
import { JoinFunction } from "../../../chips-ql/types/functions/scalar/text/join.function";
import { BytesLengthFunction } from "../../../chips-ql/types/functions/scalar/bytes/bytes-length.function";
import { Functions } from "../../../chips-ql/types/functions/functions.enum";
import { CoalesceFunction } from "../../../chips-ql/types/functions/scalar/conditionals/coalesce.function";
import { ConvertFunction } from "../../../chips-ql/types/functions/scalar/casting/convert.function";
import { DifferenceFunction } from "../../../chips-ql/types/functions/scalar/text/difference.function";
import { FormatFunction } from "../../../chips-ql/types/functions/scalar/text/format.function";
import { RightSubstringFunction } from "../../../chips-ql/types/functions/scalar/text/right-substring.function";
import { LeftSubstringFunction } from "../../../chips-ql/types/functions/scalar/text/left-substring.function";

export class MssqlFunctionsCompiler<
  T extends Object
> extends FunctionsCompiler<T> {
  constructor(partsCompiler: IQueryPartsCompiler<T>) {
    super(partsCompiler);
  }

  // Aggregate

  count = (values: CountFunction<T>) =>
    this.buildFunction("COUNT", [this.value(values.value)]);

  max = (values: MaxFunction<T>) =>
    this.buildFunction("MAX", [this.value(values.value)]);
  min = (values: MinFunction<T>) =>
    this.buildFunction("MIN", [this.value(values.value)]);

  // Scalar

  ascii = (values: AsciiFunction<T>) =>
    this.buildFunction("ASCII", [this.value(values.value)]);
  char = (values: CharFunction<T>) =>
    this.buildFunction("CHAR", [this.value(values.value)]);
  findIndex = (values: FindIndexFunction<T>) =>
    this.buildFunction("CHARINDEX", [
      this.value(values.find),
      this.value(values.on),
      values.startAt ? this.value(values.startAt) : null,
    ]);
  join = (values: JoinFunction<T>) =>
    values.sepparator
      ? this.buildFunction("CONCAT_WS", [
          values.sepparator ? this.value(values.sepparator) : "",
          ...values.values.map(this.value),
        ])
      : this.concat({ ...values, function: Functions.CONCAT });
  lower = (values: LowerFunction<T>) =>
    this.buildFunction("LOWER", [this.value(values.value)]);
  upper = (values: UpperFunction<T>) =>
    this.buildFunction("UPPER", [this.value(values.value)]);
  difference = ({ origin, target }: DifferenceFunction<T>) =>
    this.buildFunction("DIFFERENCE", [this.value(origin), this.value(target)]);
  format = ({ value, format, culture }: FormatFunction<T>) =>
    this.buildFunction("FORMAT", [this.value(value), this.value(format), culture && this.value(culture)]);
  concat = (values: ConcatFunction<T>) =>
    this.buildFunction("CONCAT", values.values.map(this.value));
  rightSubstring = ({value, length}: RightSubstringFunction<T>) => this.buildFunction('RIGHT', [this.value(value), this.value(length)]);
  leftSubstring = ({value, length}: LeftSubstringFunction<T>) => this.buildFunction('LEFT', [this.value(value), this.value(length)]);

  // Bytes
  bytesLength = (values: BytesLengthFunction<T>) =>
    this.buildFunction("DATALENGTH", [this.value(values.value)]);

  // Conditionals

  if = (values: IfFunction<T>) =>
    this.buildFunction(
      "IIF",
      [
        this.partsCompiler.where(values.condition),
        values.whenTrue ? this.value(values.whenTrue) : null,
        values.whenTrue && values.whenFalse
          ? this.value(values.whenFalse)
          : null,
      ].filter((v) => v !== null) as string[]
    );

  coalesce = ({ values }: CoalesceFunction<T>) =>
    this.buildFunction("COALESCE", values.map(this.value));

  ifNull = (values: IfNullFunction<T>) =>
    this.buildFunction("ISNULL", [
      this.value(values.value),
      this.value(values.whenNull),
    ]);

  // Casting

  cast = (values: CastFunction<T>) =>
    this.buildFunction("CAST", [
      this.value(values.value) +
        " AS " +
        this.partsCompiler.dataType(values.as),
    ]);

  convert = ({ as, value, style }: ConvertFunction<T>) =>
    this.buildFunction("CONVERT", [
      this.partsCompiler.dataType(as),
      this.value(value),
      style ? this.value(style) : null,
    ]);

  // Custom

  custom = (values: CustomFunction<T>) => {
    return this.buildFunction(
      values.name,
      values.parameters.map(this.partsCompiler.value)
    );
  };
}
