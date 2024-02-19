import { MSSQL_NUMERIC_DATATYPES } from "../../languages/mssql/constants/datatypes/mssql-numeric-datatypes.constant";

export const NUMERIC_RAW_DATATYPES = [
    // MSSQL
    ...MSSQL_NUMERIC_DATATYPES,
] as const;