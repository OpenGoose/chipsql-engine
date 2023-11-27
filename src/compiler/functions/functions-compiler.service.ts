import { CountFunction } from "../../chips-ql/types/functions/aggregate/count.function";
import { MaxFunction } from "../../chips-ql/types/functions/aggregate/max.function.type";
import { MinFunction } from "../../chips-ql/types/functions/aggregate/min.function.type";
import { CustomFunction } from "../../chips-ql/types/functions/custom/custom.function";
import { BytesLengthFunction } from "../../chips-ql/types/functions/scalar/bytes/bytes-length.function";
import { CastFunction } from "../../chips-ql/types/functions/scalar/casting/cast.function";
import { CoalesceFunction } from "../../chips-ql/types/functions/scalar/conditionals/coalesce.function";
import { IfFunction } from "../../chips-ql/types/functions/scalar/conditionals/if.function";
import { AsciiFunction } from "../../chips-ql/types/functions/scalar/text/ascii.function";
import { CharFunction } from "../../chips-ql/types/functions/scalar/text/char.function";
import { ConcatFunction } from "../../chips-ql/types/functions/scalar/text/concat.function";
import { FindIndexFunction } from "../../chips-ql/types/functions/scalar/text/find-index.function";
import { JoinFunction } from "../../chips-ql/types/functions/scalar/text/join.function";
import { LowerFunction } from "../../chips-ql/types/functions/scalar/text/lower.function";
import { UpperFunction } from "../../chips-ql/types/functions/scalar/text/upper.function";
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
  abstract lower: (values: LowerFunction<T>) => void;
  abstract upper: (values: UpperFunction<T>) => void;
  abstract concat: (values: ConcatFunction<T>) => void;

  // Bytes
  abstract bytesLength: (values: BytesLengthFunction<T>) => string;

  // Conditionals
  abstract if: (values: IfFunction<T>) => void;
  abstract coalesce: (values: CoalesceFunction<T>) => void;

  // Casting
  abstract cast: (values: CastFunction<T>) => void;

  // Custom
  abstract custom: (values: CustomFunction<T>) => string;
}
