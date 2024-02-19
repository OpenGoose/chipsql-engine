import { BooleanDataTypeOptions } from "../../chips-ql/types/datatypes/datatypes/options/bit/boolean.datatype";
import { CustomDataTypeOptions } from "../../chips-ql/types/datatypes/datatypes/options/custom/custom.datatype";
import { DateDataTypeOptions } from "../../chips-ql/types/datatypes/datatypes/options/date/date.datatype";
import { NumberDataTypeOptions } from "../../chips-ql/types/datatypes/datatypes/options/numeric/number.datatype";
import { StringDataTypeOptions } from "../../chips-ql/types/datatypes/datatypes/options/text/string.datatype";
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
  abstract string: (datatype: StringDataTypeOptions) => string;

  // Number
  abstract number: (datatype: NumberDataTypeOptions) => string;

  // Bool
  abstract boolean: (datatype: BooleanDataTypeOptions) => string;

  // Time
  abstract date: (datatype: DateDataTypeOptions) => string;

  // Custom
  abstract custom: (dataType: CustomDataTypeOptions<T>) => string;
}