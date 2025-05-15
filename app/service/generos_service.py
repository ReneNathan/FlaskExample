import requests
from app.service.constants import API_BASE_LINK


def get_all_generos():
    try:
        response = requests.get(API_BASE_LINK + "/api/generos/")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao buscar generos: {e}")
        return None
