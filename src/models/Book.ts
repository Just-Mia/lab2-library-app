import type { IBook } from './interfaces/IBook';

export class Book implements IBook {
  public id: string;
  public title: string;
  public author: string;
  public year: number;
  public isBorrowed: boolean;
  public borrowedBy: string | null;

  constructor(
    id: string,
    title: string,
    author: string,
    year: number,
    isBorrowed = false,
    borrowedBy: string | null = null
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = isBorrowed;
    this.borrowedBy = borrowedBy;
  }

  public borrow(userId: string): void {
    if (this.isBorrowed) {
      throw new Error(`Книга "${this.title}" вже позичена.`);
    }
    this.isBorrowed = true;
    this.borrowedBy = userId;
  }

  public returnBook(): void {
    this.isBorrowed = false;
    this.borrowedBy = null;
  }

  public getInfo(): string {
    return `${this.title} by ${this.author} (${this.year})`;
  }
}