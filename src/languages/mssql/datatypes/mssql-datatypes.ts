import { DataType } from "../../../chips-lq/types/datatypes/datatype.type";
import { DataTypes } from "../../../chips-lq/types/datatypes/datatypes.enum";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";
import { MssqlDataTypesCompiler } from "./mssql-datatypes.compiler";

export const mssqlDataTypes = <T extends Object>(value: DataType, partsCompiler: MssqlPartsCompiler<T>) => {
    const compiler = new MssqlDataTypesCompiler<T>(partsCompiler);

    switch (value.dataType) {
        // Text
        case DataTypes.VARCHAR: return compiler.varchar(value);

        // Number
        case DataTypes.INT: return compiler.int(value);
        case DataTypes.DECIMAL: return compiler.decimal(value);

        // Bit
        case DataTypes.BOOLEAN: return compiler.boolean(value);

        // Date
        case DataTypes.DATE: return compiler.date(value);

        case DataTypes.CUSTOM: return compiler.custom(value);
        default: throw new UnavailableFeatureError(value);
    }
}