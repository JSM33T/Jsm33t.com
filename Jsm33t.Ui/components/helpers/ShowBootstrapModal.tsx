export type ShowModalOptions = {
	title: string;
	body: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
};

export async function showBootstrapModal({
	title,
	body,
	confirmText = "OK",
	cancelText = "Cancel",
	onConfirm,
}: ShowModalOptions) {
	const { Modal } = await import("bootstrap");

	const modalContainer = document.createElement("div");
	modalContainer.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${body}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">${cancelText}</button>
            <button type="button" class="btn btn-danger confirm-btn">${confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  `;

	document.body.appendChild(modalContainer);
	const modalEl = modalContainer.querySelector(".modal") as HTMLElement;
	//const modal = new Modal(modalEl);
	const modal = new Modal(modalEl, { backdrop: 'static', keyboard: false });


	modalContainer.querySelector(".confirm-btn")?.addEventListener("click", () => {
		onConfirm?.();
		modal.hide();
	});

	modalEl.addEventListener("hidden.bs.modal", () => {
		modalContainer.remove();
	});

	modal.show();
}
