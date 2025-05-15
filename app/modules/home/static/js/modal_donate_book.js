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

  enable_button_and_remove_loading();
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
  const fileInput = document.getElementById('livro_img_donate_file_input');
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


//submit
const btn_donate_book_submit = document.getElementById("btn_donate_book_submit");
btn_donate_book_submit.addEventListener("click", async function () {

  disable_button_and_put_loading();

  const livro = {
    title: document.getElementById("livro_name_donate").value.trim(),
    author_id: parseInt(document.getElementById("authors").value),
    publication_year: parseInt(document.getElementById("livro_publicacao_donate").value),
    genre_id: parseInt(document.getElementById("genres").value),
    image: await img_file_to_base64(document.getElementById("livro_img_donate_file_input").files[0]),
  };

  const livros_qtd = document.getElementById("livro_qtd_donate").value

  fetch("/livros/cadastrar/"+livros_qtd, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livro),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          text: "Muito obrigado pela doação!",
          icon: "success",
        }).then(() => {
          closeModal();
        });
      } else {
        // Erro ao cadastrar livro
        console.error("Erro ao cadastrar livro:", data.message);
      }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar livro:", error);
    });
});

async function img_file_to_base64(file) {
  if (file) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    } catch (err) {
      console.error("Erro ao converter imagem:", err);
      alert("Erro ao processar a imagem.");
      return;
    }
  }
}

function disable_button_and_put_loading() {
  document.getElementById("btn_donate_book_submit").disabled = true;
  document.getElementById("normal_text_donate").style.display = "none";
  document.querySelector(".spinner-border").style.display = "block";
  document.getElementById("btn_donate_book_submit").classList.add("btn_disabled");
}

function enable_button_and_remove_loading() {
  document.getElementById("btn_donate_book_submit").disabled = false;
  document.getElementById("normal_text_donate").style.display = "block";
  document.querySelector(".spinner-border").style.display = "none";
  document.getElementById("btn_donate_book_submit").classList.remove("btn_disabled");
  clear_modal_inputs();
}

function clear_modal_inputs() {
  document.getElementById("livro_name_donate").value = "";
  document.getElementById("livro_publicacao_donate").value = "";
  document.getElementById("livro_img_donate_file_input").value = "";
  document.getElementById("authors").value = "Selecione";
  document.getElementById("genres").value = "Selecione";
  document.getElementById("livro_qtd_donate").value = "1";
  document.getElementById("image_container").querySelector("img").src = "";
}