import { Library } from '../services/Library';
import { Book } from '../models/Book';
import { User } from '../models/User';
export declare function renderApp(appContainer: HTMLElement, bookLibrary: Library<Book>, userLibrary: Library<User>, handlers: {
    onAddBook: (title: string, author: string, year: number) => void;
    onAddUser: (name: string, email: string) => void;
    onBorrowBook: (bookId: string) => void;
    onReturnBook: (bookId: string) => void;
}): void;
//# sourceMappingURL=render.d.ts.map