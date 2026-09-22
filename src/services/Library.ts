export class Library<T extends { id: string }> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < initialLength;
  }

  public findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public findBy(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  public clear(): void {
    this.items = [];
  }
}