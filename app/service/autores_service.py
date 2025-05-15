import requests
from app.service.constants import API_BASE_LINK


def get_all_autores():
    try:
        response = requests.get(API_BASE_LINK + "/api/autores/")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro ao buscar autores: {e}")
        return None
