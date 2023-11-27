export interface Table<T extends Object> {
    name: string;
    schema?: string;
    alias?: string;
}