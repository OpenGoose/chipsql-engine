import { Query } from "../../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../features/unavailable-feature.error";
import { MssqlCompiler } from "./mssql/mssql.compiler";

export class QueryCompiler<T extends Object> {
    constructor (
        private readonly query: Query<T>,
        private readonly sqlLanguage: SqlLanguages
    ) {}

    public compile = () => {
        const compiler = QueryCompiler.getCompiler(this.sqlLanguage, this.query);
        return compiler.compile();
    }

    public static getCompiler = <T extends Object>(sqlLanguage: SqlLanguages, query: Query<T>) => {
        switch (sqlLanguage) {
            case SqlLanguages.MSSQL: return new MssqlCompiler(query);
        }
        throw new UnavailableFeatureError(sqlLanguage);
    }
}