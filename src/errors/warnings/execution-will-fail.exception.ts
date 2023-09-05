import { QueryError } from "../query-error";

export class ExecutionWillFailException extends QueryError {
    constructor () {
        super ('Compilation process aborted. The QueryWarningService indicates the query will not execute because of composition errors.');
    }
}