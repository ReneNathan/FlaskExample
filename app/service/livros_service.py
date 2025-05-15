import requests
from app.service.constants import API_BASE_LINK
from app.service.estoque_service import cadastrar_estoque


def get_all_livros():
    try:
        response = requests.get(API_BASE_LINK + "/api/livros/")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao buscar livros: {e}")
        return None


def cadastrar_livro(livro_to_register, qtd=1):
    try:
        response = requests.post(API_BASE_LINK + "/api/livros/", json=livro_to_register)
        response.raise_for_status()
        livros = get_all_livros()
        for livro in livros:
            if livro["title"] == livro_to_register["title"]:
                estoque = {"book_id": livro["id"], "quantity": qtd}
                cadastrar_estoque(estoque)
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao cadastrar livro: {e}")
        return None
