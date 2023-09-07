import { BooleanDataType } from "../../chips-lq/types/datatypes/datatypes/bit/boolean.datatype";
import { DateDataType } from "../../chips-lq/types/datatypes/datatypes/date/date.datatype";
import { DecimalDataType } from "../../chips-lq/types/datatypes/datatypes/numeric/decimal.datatype";
import { IntDataType } from "../../chips-lq/types/datatypes/datatypes/numeric/int.datatype";
import { VarcharDataType } from "../../chips-lq/types/datatypes/datatypes/text/varchar.datatype";
import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";
import { joinParts } from "../utils/query-generation/join-parts.util";

export abstract class DataTypesCompiler<T extends Object> {
  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildDataType: (
      name: string,
      parameters?: (string | undefined | null)[]
    ) => string = (name, parameters) =>
      joinParts(
        [name, parameters ? `(${joinParts(parameters, ", ")})` : ""],
        ""
      )
  ) {}

  abstract varchar: (datatype: VarcharDataType) => string;
  abstract int: (datatype: IntDataType) => string;
  abstract decimal: (datatype: DecimalDataType) => string;
  abstract boolean: (datatype: BooleanDataType) => string;
  abstract date: (datatype: DateDataType) => string;
}