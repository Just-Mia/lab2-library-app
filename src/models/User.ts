import type { IUser } from './interfaces/IUser';

export class User implements IUser {
  public id: string;
  public name: string;
  public email: string;
  public borrowedBooksCount: number;

  constructor(id: string, name: string, email: string, borrowedBooksCount = 0) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooksCount = borrowedBooksCount;
  }

  public getInfo(): string {
    return `${this.id} ${this.name} (${this.email})`;
  }
}