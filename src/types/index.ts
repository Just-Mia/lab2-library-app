


import 'bootstrap/dist/css/bootstrap.min.css';
import { Library } from '../services/Library';
import { StorageService } from '../services/Storage';
import { NotificationService } from '../services/NotificationService';
import { Book } from '../models/Book';
import { User } from '../models/User';
import { generateId } from '../utils/idGenerator';
import { validateRequired, validateEmail, validateYear, validateNumericId } from '../utils/validators';
import { renderApp } from '../ui/render';
import { showBorrowModal } from '../ui/components/Modal';

export const MAX_BORROWED_BOOKS = 3;

const BOOKS_KEY = 'lib_books';
const USERS_KEY = 'lib_users';

const rawBooks = StorageService.get<Book>(BOOKS_KEY);
const rawUsers = StorageService.get<User>(USERS_KEY);

const bookLibrary = new Library<Book>(
  rawBooks.map((b) => new Book(b.id, b.title, b.author, b.year, b.isBorrowed, b.borrowedBy))
);

const userLibrary = new Library<User>(
  rawUsers.map((u) => new User(u.id, u.name, u.email, u.borrowedBooksCount))
);

let bookPage = 1;
let userPage = 1;
let searchQuery = '';

const appContainer = document.getElementById('app') as HTMLElement;

function saveAndRender(): void {
  StorageService.save(BOOKS_KEY, bookLibrary.getAll());
  StorageService.save(USERS_KEY, userLibrary.getAll());

  renderApp(
    appContainer,
    bookLibrary,
    userLibrary,
    { bookPage, userPage, searchQuery },
    {
      onAddBook: handleAddBook,
      onAddUser: handleAddUser,
      onBorrowBook: handleBorrowBook,
      onReturnBook: handleReturnBook,
      onDeleteBook: handleDeleteBook,
      onDeleteUser: handleDeleteUser,
      onSearchBooks: (query: string) => {
        searchQuery = query;
        bookPage = 1;
        saveAndRender();
      },
      onBookPageChange: (page: number) => {
        bookPage = page;
        saveAndRender();
      },
      onUserPageChange: (page: number) => {
        userPage = page;
        saveAndRender();
      }
    }
  );
}

function handleAddBook(title: string, author: string, year: number): void {
  const vTitle = validateRequired(title, 'Назва книги');
  if (!vTitle.isValid) return NotificationService.show(vTitle.message!, 'danger');

  const vAuthor = validateRequired(author, 'Автор');
  if (!vAuthor.isValid) return NotificationService.show(vAuthor.message!, 'danger');

  const vYear = validateYear(year.toString());
  if (!vYear.isValid) return NotificationService.show(vYear.message!, 'danger');

  const newBook = new Book(generateId(), title, author, year);
  bookLibrary.addItem(newBook);
  NotificationService.show(`Книгу "${title}" успішно додано!`, 'success');
  saveAndRender();
}

function handleAddUser(id: string, name: string, email: string): void {
  const vId = validateNumericId(id);
  if (!vId.isValid) return NotificationService.show(vId.message!, 'danger');

  if (userLibrary.findById(id)) {
    return NotificationService.show('Користувач з таким ID вже існує.', 'danger');
  }

  const vName = validateRequired(name, "Ім'я");
  if (!vName.isValid) return NotificationService.show(vName.message!, 'danger');

  const vEmail = validateEmail(email);
  if (!vEmail.isValid) return NotificationService.show(vEmail.message!, 'danger');

  const newUser = new User(id, name, email);
  userLibrary.addItem(newUser);
  NotificationService.show(`Користувача "${name}" успішно додано!`, 'success');
  saveAndRender();
}

function handleDeleteBook(bookId: string): void {
  const book = bookLibrary.findById(bookId);
  if (!book) return;


  if (book.isBorrowed) {
    return NotificationService.show(
      `Неможливо видалити книгу "${book.title}", оскільки вона зараз позичена!`,
      'danger'
    );
  }

  bookLibrary.removeItem(bookId);
  NotificationService.show(`Книгу "${book.title}" успішно видалено.`, 'info');
  saveAndRender();
}

function handleDeleteUser(userId: string): void {
  const user = userLibrary.findById(userId);
  if (!user) return;


  if (user.borrowedBooksCount > 0) {
    return NotificationService.show(
      `Неможливо видалити користувача "${user.name}", оскільки за ним числиться ${user.borrowedBooksCount} позичена(і) книга(и)!`,
      'danger'
    );
  }

  userLibrary.removeItem(userId);
  NotificationService.show(`Користувача "${user.name}" успішно видалено.`, 'info');
  saveAndRender();
}

function handleBorrowBook(bookId: string): void {
  const book = bookLibrary.findById(bookId);
  if (!book) return;

  showBorrowModal(book.title, (userId: string) => {
    const user = userLibrary.findById(userId);

    if (!user) {
      NotificationService.show('Користувача з таким ID не знайдено.', 'danger');
      return;
    }

    if (user.borrowedBooksCount >= MAX_BORROWED_BOOKS) {
      NotificationService.show(
        `Перевищено ліміт! Користувач не може позичити більше ніж ${MAX_BORROWED_BOOKS} книг.`,
        'danger'
      );
      return;
    }

    try {
      book.borrow(user.id);
      user.borrowedBooksCount += 1;
      NotificationService.show(`Книгу "${book.title}" успішно позичено!`, 'success');
      saveAndRender();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Помилка';
      NotificationService.show(msg, 'danger');
    }
  });
}

function handleReturnBook(bookId: string): void {
  const book = bookLibrary.findById(bookId);
  if (!book || !book.isBorrowed || !book.borrowedBy) return;

  const user = userLibrary.findById(book.borrowedBy);
  if (user && user.borrowedBooksCount > 0) {
    user.borrowedBooksCount -= 1;
  }

  book.returnBook();
  NotificationService.show(`Книгу "${book.title}" повернено.`, 'success');
  saveAndRender();
}

saveAndRender();