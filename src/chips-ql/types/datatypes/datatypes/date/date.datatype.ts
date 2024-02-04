import { DataType } from "../../datatypes.enum";
import { IDateDataType } from "./date.datatype.interface";

export interface DateDataType extends IDateDataType {
    dataType: DataType.DATE;

    includeTime?: boolean;
}