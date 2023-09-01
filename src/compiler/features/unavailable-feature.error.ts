import { QueryError } from "../../errors/query-error";

export class UnavailableFeatureError extends QueryError {
    constructor(feature?: string) {
        super(`Feature not available${feature === undefined ? '' : ` (${feature})`}`);
    }
}