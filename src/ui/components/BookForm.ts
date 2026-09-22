export function createBookForm(onSubmit: (title: string, author: string, year: number) => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'card mb-4 shadow-sm';

  container.innerHTML = `
    <div class="card-body">
      <h3 class="card-title h5 mb-3">Додати Книгу</h3>
      <form id="book-form">
        <div class="mb-2">
          <input type="text" id="book-title" class="form-control" placeholder="Назва книги">
        </div>
        <div class="mb-2">
          <input type="text" id="book-author" class="form-control" placeholder="Автор">
        </div>
        <div class="mb-3">
          <input type="number" id="book-year" class="form-control" placeholder="Рік видання">
        </div>
        <button type="submit" class="btn btn-success">Додати Книгу</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#book-form') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = container.querySelector('#book-title') as HTMLInputElement;
    const authorInput = container.querySelector('#book-author') as HTMLInputElement;
    const yearInput = container.querySelector('#book-year') as HTMLInputElement;

    onSubmit(titleInput.value, authorInput.value, parseInt(yearInput.value, 10));
  });

  return container;
}