import { QueryError } from "../query-error";

export class CompilerException extends QueryError {
    constructor(step: string = 'unknown') {
        super(`The compiler crashed due to an unknown exception while compiling on step '${step}'`);
    }
}