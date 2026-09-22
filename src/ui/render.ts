// import { Library } from '../services/Library';
// import { Book } from '../models/Book';
// import { User } from '../models/User';
// import { createBookForm } from './components/BookForm';
// import { createUserForm } from './components/UserForm';
// import { createBookList } from './components/BookList';
// import { createUserList } from './components/UserList';

// export function renderApp(
//   appContainer: HTMLElement,
//   bookLibrary: Library<Book>,
//   userLibrary: Library<User>,
//   handlers: {
//     onAddBook: (title: string, author: string, year: number) => void;
//     onAddUser: (name: string, email: string) => void;
//     onBorrowBook: (bookId: string) => void;
//     onReturnBook: (bookId: string) => void;
//   }
// ): void {
//   appContainer.innerHTML = '';

//   const mainContainer = document.createElement('div');
//   mainContainer.className = 'container my-4';
//   mainContainer.style.maxWidth = '800px';

//   const header = document.createElement('h1');
//   header.className = 'text-center mb-4 h3 fw-bold';
//   header.textContent = 'Система Управління Бібліотекою';
//   mainContainer.appendChild(header);

//   mainContainer.appendChild(createBookForm(handlers.onAddBook));
//   mainContainer.appendChild(createUserForm(handlers.onAddUser));
//   mainContainer.appendChild(createBookList(bookLibrary.getAll(), handlers.onBorrowBook, handlers.onReturnBook));
//   mainContainer.appendChild(createUserList(userLibrary.getAll()));

//   appContainer.appendChild(mainContainer);
// }


import { Library } from '../services/Library';
import { Book } from '../models/Book';
import { User } from '../models/User';
import { createBookForm } from './components/BookForm';
import { createUserForm } from './components/UserForm';
import { createBookList } from './components/BookList';
import { createUserList } from './components/UserList';

export function renderApp(
  appContainer: HTMLElement,
  bookLibrary: Library<Book>,
  userLibrary: Library<User>,
  state: {
    bookPage: number;
    userPage: number;
    searchQuery: string;
  },
  handlers: {
    onAddBook: (title: string, author: string, year: number) => void;
    onAddUser: (id: string, name: string, email: string) => void;
    onBorrowBook: (bookId: string) => void;
    onReturnBook: (bookId: string) => void;
    onDeleteBook: (bookId: string) => void;
    onDeleteUser: (userId: string) => void;
    onSearchBooks: (query: string) => void;
    onBookPageChange: (page: number) => void;
    onUserPageChange: (page: number) => void;
  }
): void {
  appContainer.innerHTML = '';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'container my-4';
  mainContainer.style.maxWidth = '800px';

  const header = document.createElement('h1');
  header.className = 'text-center mb-4 h3 fw-bold';
  header.textContent = 'Система Управління Бібліотекою';
  mainContainer.appendChild(header);

  mainContainer.appendChild(createBookForm(handlers.onAddBook));
  mainContainer.appendChild(createUserForm(handlers.onAddUser));
  
  mainContainer.appendChild(
    createBookList(
      bookLibrary.getAll(),
      state.bookPage,
      state.searchQuery,
      handlers.onBorrowBook,
      handlers.onReturnBook,
      handlers.onDeleteBook,
      handlers.onSearchBooks,
      handlers.onBookPageChange
    )
  );

  mainContainer.appendChild(
    createUserList(
      userLibrary.getAll(),
      state.userPage,
      handlers.onDeleteUser,
      handlers.onUserPageChange
    )
  );

  appContainer.appendChild(mainContainer);
}