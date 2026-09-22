export declare class Library<T extends {
    id: string;
}> {
    private items;
    constructor(initialItems?: T[]);
    addItem(item: T): void;
    removeItem(id: string): boolean;
    findById(id: string): T | undefined;
    getAll(): T[];
    findBy(predicate: (item: T) => boolean): T[];
    clear(): void;
}
//# sourceMappingURL=Library.d.ts.map