

import { User } from '../../models/User';

export function createUserList(
  users: User[],
  currentPage: number,
  onDelete: (userId: string) => void,
  onPageChange: (page: number) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'card mb-4 shadow-sm';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h3');
  title.className = 'card-title h5 mb-3';
  title.textContent = 'Список Користувачів';
  cardBody.appendChild(title);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (paginatedUsers.length === 0) {
    const emptyText = document.createElement('p');
    emptyText.className = 'text-muted';
    emptyText.textContent = 'Користувачі відсутні.';
    cardBody.appendChild(emptyText);
  } else {
    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush mb-3';

    paginatedUsers.forEach((user) => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-center px-0 py-2';

      const info = document.createElement('span');
      info.textContent = `${user.getInfo()} — Позичено: ${user.borrowedBooksCount}`;

    


      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-outline-danger btn-sm';
      deleteBtn.textContent = 'Видалити';


      if (user.borrowedBooksCount > 0) {
        deleteBtn.disabled = true;
        deleteBtn.title = 'Неможливо видалити користувача, який має позичені книги';
      } else {
        deleteBtn.addEventListener('click', () => onDelete(user.id));
      }

      item.appendChild(info);
      item.appendChild(deleteBtn);
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