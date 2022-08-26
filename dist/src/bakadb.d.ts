declare class BakaDB {
    private db;
    constructor(path?: string);
    set(path: string, value: any): void;
    get(path: string, fallback: unknown): any;
}
export default BakaDB;
//# sourceMappingURL=bakadb.d.ts.map