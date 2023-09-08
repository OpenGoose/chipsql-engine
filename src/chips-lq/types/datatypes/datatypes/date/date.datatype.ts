import { DataTypes } from "../../datatypes.enum";
import { IDateDataType } from "./date.datatype.interface";

export interface DateDataType extends IDateDataType {
    dataType: DataTypes.DATE;

    includeTime?: boolean;
}