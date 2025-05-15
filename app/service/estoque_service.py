import requests
from app.service.constants import API_BASE_LINK


def get_all_estoques():
    try:
        response = requests.get(API_BASE_LINK + "/api/stock/")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao buscar estoques: {e}")
        return None


def cadastrar_estoque(estoque):
    try:
        response = requests.post(API_BASE_LINK + "/api/stock/", json=estoque)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao cadastrar estoque: {e}")
        return None
