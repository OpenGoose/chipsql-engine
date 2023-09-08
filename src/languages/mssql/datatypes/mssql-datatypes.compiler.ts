import { BooleanDataType } from "../../../chips-lq/types/datatypes/datatypes/bit/boolean.datatype";
import { CustomDataType } from "../../../chips-lq/types/datatypes/datatypes/custom/custom.datatype";
import { DateDataType } from "../../../chips-lq/types/datatypes/datatypes/date/date.datatype";
import { DecimalDataType } from "../../../chips-lq/types/datatypes/datatypes/numeric/decimal.datatype";
import { IntDataType } from "../../../chips-lq/types/datatypes/datatypes/numeric/int.datatype";
import { VarcharDataType } from "../../../chips-lq/types/datatypes/datatypes/text/varchar.datatype";
import { DataTypesCompiler } from "../../../compiler/datatypes/datatypes-compiler.service";
import { MssqlPartsCompiler } from "../query-parts-compiler/mssql-parts.compiler";

export class MssqlDataTypesCompiler<T extends Object> extends DataTypesCompiler<T> {

    constructor (partsCompiler: MssqlPartsCompiler<T>) {
        super(partsCompiler);
    }

    varchar = (datatype: VarcharDataType) => this.buildDataType('VARCHAR', [datatype.length === Infinity ? 'MAX' : datatype.length?.toString()]);
    int = (datatype: IntDataType) => this.buildDataType('INT');
    decimal = (datatype: DecimalDataType) => this.buildDataType('DECIMAL');
    boolean = (datatype: BooleanDataType) => this.buildDataType('BIT');
    date = (datatype: DateDataType) => {
        const name = datatype.includeTime ? 'DATETIME2' : 'DATE';
        return this.buildDataType(name);
    }

    custom = (dataType: CustomDataType<T>) => this.buildDataType(dataType.name, dataType.parameters.map(this.partsCompiler.value));
    
}