

export function createUserForm(onSubmit: (id: string, name: string, email: string) => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'card mb-4 shadow-sm';

  container.innerHTML = `
    <div class="card-body">
      <h3 class="card-title h5 mb-3">Додати Користувача</h3>
      <form id="user-form">
        <div class="mb-2">
          <input type="text" id="user-id" class="form-control" placeholder="ID Користувача (тільки цифри)">
        </div>
        <div class="mb-2">
          <input type="text" id="user-name" class="form-control" placeholder="Ім'я">
        </div>
        <div class="mb-3">
          <input type="email" id="user-email" class="form-control" placeholder="Email">
        </div>
        <button type="submit" class="btn btn-success">Додати Користувача</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#user-form') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idInput = container.querySelector('#user-id') as HTMLInputElement;
    const nameInput = container.querySelector('#user-name') as HTMLInputElement;
    const emailInput = container.querySelector('#user-email') as HTMLInputElement;

    onSubmit(idInput.value, nameInput.value, emailInput.value);
  });

  return container;
}