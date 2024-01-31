export interface Table<T extends NonNullable<unknown>> {
    name: string;
    schema?: string;
    alias?: string;
}