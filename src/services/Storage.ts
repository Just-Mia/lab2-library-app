export class StorageService {
  public static save<T>(key: string, data: T[]): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error('Помилка збереження в LocalStorage:', e);
    }
  }

  public static get<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Помилка зчитування з LocalStorage:', e);
      return [];
    }
  }


  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(key: string): void {
    localStorage.removeItem(key);
  }
}