function openModal() {
  const overlay = document.getElementById("modal_donate_book");
  const modal = overlay.querySelector(".modal-content");

  overlay.classList.add("show");
  document.documentElement.classList.add("modal-open"); // <html>

  modal.classList.remove("fade-out");
  void modal.offsetWidth;
  modal.classList.add("fade-in");
}

function closeModal() {
  const overlay = document.getElementById("modal_donate_book");
  const modal = overlay.querySelector(".modal-content");

  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");

  setTimeout(() => {
    overlay.classList.remove("show");
    document.documentElement.classList.remove("modal-open"); // <html>
  }, 300);
}

const btn_donate_book = document.getElementById("btn_donate_book");
btn_donate_book.addEventListener("click", openModal);

// Fechar ao clicar fora
window.onclick = function (event) {
  const overlay = document.getElementById("modal_donate_book");
  const modal = overlay.querySelector(".modal-content");
  if (event.target === overlay) {
    closeModal();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const fakeBtn = document.getElementById('fake_book_upload_btn');
  const fileInput = document.getElementById('avatar');
  const imgContainer = document.getElementById('image_container').querySelector('img');

  fakeBtn.innerText = 'Clique para enviar uma imagem do livro';

  fakeBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        imgContainer.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});