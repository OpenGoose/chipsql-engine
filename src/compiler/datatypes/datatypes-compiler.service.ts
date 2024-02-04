import { BooleanDataType } from "../../chips-ql/types/datatypes/datatypes/bit/boolean.datatype";
import { CustomDataType } from "../../chips-ql/types/datatypes/datatypes/custom/custom.datatype";
import { DateDataType } from "../../chips-ql/types/datatypes/datatypes/date/date.datatype";
import { BigintDataType } from "../../chips-ql/types/datatypes/datatypes/numeric/bigint.datatype";
import { ByteDataType } from "../../chips-ql/types/datatypes/datatypes/numeric/byte.datatype";
import { DecimalDataType } from "../../chips-ql/types/datatypes/datatypes/numeric/decimal.datatype";
import { IntDataType } from "../../chips-ql/types/datatypes/datatypes/numeric/int.datatype";
import { VarcharDataType } from "../../chips-ql/types/datatypes/datatypes/text/varchar.datatype";
import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";
import { joinParts } from "../utils/query-generation/join-parts.util";

export abstract class DataTypeCompiler<T extends Object> {
  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildDataType: (
      name: string,
      parameters?: (string | undefined | null)[]
    ) => string = (name, parameters) =>
      {
        const filteredParams = parameters?.filter((p) => p !== null && p !== undefined);
        return joinParts(
          [
            name,
            filteredParams && filteredParams.length > 0
              ? `(${joinParts(filteredParams, ", ")})`
              : "",
          ],
          ""
        );
      }
  ) {}

  // Text
  abstract varchar: (datatype: VarcharDataType) => string;

  // Number
  abstract byte: (datatype: ByteDataType) => string;
  abstract int: (datatype: IntDataType) => string;
  abstract decimal: (datatype: DecimalDataType) => string;
  abstract bigint: (datatype: BigintDataType) => string;

  // Bool
  abstract boolean: (datatype: BooleanDataType) => string;

  // Time
  abstract date: (datatype: DateDataType) => string;

  // Custom
  abstract custom: (dataType: CustomDataType<T>) => string;
}