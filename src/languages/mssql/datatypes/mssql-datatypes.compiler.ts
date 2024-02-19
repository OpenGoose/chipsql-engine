import { BooleanDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/bit/boolean.datatype";
import { CustomDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/custom/custom.datatype";
import { DateDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/date/date.datatype";
import { NumberDataTypeOptions, NumberPrecision, NumberSize, NumberVariant } from "../../../chips-ql/types/datatypes/datatypes/options/numeric/number.datatype";
import { StringDataTypeOptions } from "../../../chips-ql/types/datatypes/datatypes/options/text/string.datatype";
import { Value } from "../../../chips-ql/types/values/value.type";
import { DataTypeCompiler } from "../../../compiler/datatypes/datatypes-compiler.service";
import { MSSQL_DATATYPES_MAP } from "../../../map/datatypes/mssql-datatypes.map";
import { MssqlDataType } from "./mssql-datatypes-list.enum";

const DEFAULT_NUMBER_PRECISION = NumberPrecision.EXACT;

export class MssqlDataTypeCompiler<
  T extends Object
> extends DataTypeCompiler<T> {

  private buildRawDataType = ({ rawDataType, params }: { rawDataType: MssqlDataType, params?: Value<object>[] }) => this.buildDataType(MSSQL_DATATYPES_MAP[rawDataType], params?.map(this.partsCompiler.value));

  // Text
  string = (datatype: StringDataTypeOptions) => {
    if (datatype.rawDataType) return this.buildRawDataType(datatype);
    
    return this.buildDataType(MSSQL_DATATYPES_MAP[MssqlDataType.VARCHAR], [
      datatype.length === Infinity ? "MAX" : datatype.length?.toString(),
    ]);
  }

  // Number
  number = (datatype: NumberDataTypeOptions) => {
    if (datatype.rawDataType) return this.buildRawDataType(datatype);
    const precision = datatype.precision ?? DEFAULT_NUMBER_PRECISION;

    let type: MssqlDataType;
    if (precision === NumberPrecision.APPROXIMATE) type = MssqlDataType.REAL;
    else type = MssqlDataType.INT;

    if (datatype.variant === NumberVariant.DECIMAL) {
      if (precision === NumberPrecision.APPROXIMATE) type = MssqlDataType.DECIMAL;
      else type = MssqlDataType.FLOAT;
    }
    else if (datatype.variant === NumberVariant.MONEY) {
      switch (datatype.size) {
        case NumberSize.SMALL:
        case NumberSize.TINY:
          type = MssqlDataType.SMALLMONEY;
          break;
        default:
          type = MssqlDataType.MONEY;
          break;
      }
    } else {
      switch (datatype.size) {
        case NumberSize.BIG: type = MssqlDataType.BIGINT; break;
        case NumberSize.SMALL: type = MssqlDataType.SMALLINT; break;
        case NumberSize.TINY: type = MssqlDataType.TINYINT; break;
      }
    }


    return this.buildDataType(MSSQL_DATATYPES_MAP[type], datatype.length === undefined ? undefined : [datatype.length.toString()]);
  }

  // Bit
  boolean = (datatype: BooleanDataTypeOptions) => {
    if (datatype.rawDataType) return this.buildRawDataType(datatype);

    return this.buildDataType(MSSQL_DATATYPES_MAP[MssqlDataType.BIT]);
  }

  // Date
  date = (datatype: DateDataTypeOptions) => {
    if (datatype.rawDataType) return this.buildRawDataType(datatype);

    const name = datatype.includeTime ? MSSQL_DATATYPES_MAP[MssqlDataType.DATETIME2] : MSSQL_DATATYPES_MAP[MssqlDataType.DATE];
    return this.buildDataType(name);
  };

  // Custom
  custom = (dataType: CustomDataTypeOptions<T>) =>
    this.buildDataType(
      dataType.name,
      dataType.parameters.map(this.partsCompiler.value)
    );
}
