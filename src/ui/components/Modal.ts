export function showBorrowModal(bookTitle: string, onConfirm: (userId: string) => void): void {
  const existingModal = document.getElementById('borrow-modal');
  if (existingModal) existingModal.remove();

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'borrow-modal';
  modalOverlay.className = 'modal fade show d-block';
  modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Позичити книгу: "${bookTitle}"</h5>
          <button type="button" class="btn-close" id="modal-close-btn"></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Введіть ID користувача:</label>
          <input type="text" id="modal-user-id" class="form-control" placeholder="ID Користувача">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Скасувати</button>
          <button type="button" class="btn btn-primary" id="modal-submit-btn">Підтвердити</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const close = () => modalOverlay.remove();

  modalOverlay.querySelector('#modal-close-btn')?.addEventListener('click', close);
  modalOverlay.querySelector('#modal-cancel-btn')?.addEventListener('click', close);

  modalOverlay.querySelector('#modal-submit-btn')?.addEventListener('click', () => {
    const input = modalOverlay.querySelector('#modal-user-id') as HTMLInputElement;
    if (input.value.trim()) {
      onConfirm(input.value.trim());
      close();
    }
  });
}