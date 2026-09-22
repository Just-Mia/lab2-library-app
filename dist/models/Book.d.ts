import type { IBook } from './interfaces/IBook';
export declare class Book implements IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
    borrowedBy: string | null;
    constructor(id: string, title: string, author: string, year: number, isBorrowed?: boolean, borrowedBy?: string | null);
    borrow(userId: string): void;
    returnBook(): void;
    getInfo(): string;
}
//# sourceMappingURL=Book.d.ts.map