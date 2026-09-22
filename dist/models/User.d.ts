import type { IUser } from './interfaces/IUser';
export declare class User implements IUser {
    id: string;
    name: string;
    email: string;
    borrowedBooksCount: number;
    constructor(id: string, name: string, email: string, borrowedBooksCount?: number);
    getInfo(): string;
}
//# sourceMappingURL=User.d.ts.map