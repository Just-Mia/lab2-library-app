



import { Book } from '../../models/Book';

export function createBookList(
  books: Book[],
  currentPage: number,
  searchQuery: string,
  onBorrow: (bookId: string) => void,
  onReturn: (bookId: string) => void,
  onDelete: (bookId: string) => void,
  onSearch: (query: string) => void,
  onPageChange: (page: number) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'card mb-4 shadow-sm';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';


  cardBody.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="card-title h5 m-0">Список Книг</h3>
      <input type="text" id="search-book" class="form-control form-control-sm w-50" placeholder="Пошук за назвою або автором..." value="${searchQuery}">
    </div>
  `;

  const searchInput = cardBody.querySelector('#search-book') as HTMLInputElement;
  searchInput.addEventListener('input', (e) => {
    onSearch((e.target as HTMLInputElement).value);
  });


  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (paginatedBooks.length === 0) {
    const emptyText = document.createElement('p');
    emptyText.className = 'text-muted';
    emptyText.textContent = searchQuery ? 'Нічого не знайдено.' : 'Книги відсутні.';
    cardBody.appendChild(emptyText);
  } else {
    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush mb-3';

    paginatedBooks.forEach((book) => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-center px-0 py-2';

      const infoText = document.createElement('span');
      infoText.textContent = book.getInfo();

      const btnGroup = document.createElement('div');

      const actionBtn = document.createElement('button');
      if (book.isBorrowed) {
        actionBtn.className = 'btn btn-outline-warning btn-sm me-2';
        actionBtn.textContent = `Повернути (${book.borrowedBy})`;
        actionBtn.addEventListener('click', () => onReturn(book.id));
      } else {
        actionBtn.className = 'btn btn-primary btn-sm me-2';
        actionBtn.textContent = 'Позичити';
        actionBtn.addEventListener('click', () => onBorrow(book.id));
      }

      // const deleteBtn = document.createElement('button');
      // deleteBtn.className = 'btn btn-outline-danger btn-sm';
      // deleteBtn.textContent = 'Видалити';
      // deleteBtn.addEventListener('click', () => onDelete(book.id));

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-outline-danger btn-sm';
      deleteBtn.textContent = 'Видалити';


      if (book.isBorrowed) {
        deleteBtn.disabled = true;
        deleteBtn.title = 'Неможливо видалити позичену книгу';
      } else {
        deleteBtn.addEventListener('click', () => onDelete(book.id));
      }

      btnGroup.appendChild(actionBtn);
      btnGroup.appendChild(deleteBtn);
      item.appendChild(infoText);
      item.appendChild(btnGroup);
      listGroup.appendChild(item);
    });

    cardBody.appendChild(listGroup);
  }


  if (totalPages > 1) {
    const nav = document.createElement('nav');
    const pagination = document.createElement('ul');
    pagination.className = 'pagination pagination-sm justify-content-center m-0';

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === validPage ? 'active' : ''}`;
      const btn = document.createElement('button');
      btn.className = 'page-link';
      btn.textContent = i.toString();
      btn.addEventListener('click', () => onPageChange(i));
      li.appendChild(btn);
      pagination.appendChild(li);
    }
    nav.appendChild(pagination);
    cardBody.appendChild(nav);
  }

  container.appendChild(cardBody);
  return container;
}