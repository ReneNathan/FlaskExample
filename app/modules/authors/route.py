from flask import Blueprint, render_template, request, jsonify
from app.service import autores_service

authors_bp = Blueprint(
    "authors",
    __name__,
    template_folder="templates",
    static_folder="static",  # <--- precisa disso
    static_url_path="/authors/static",  # <--- define a URL para os arquivos estáticos
    url_prefix="/autores",
)


@authors_bp.route("/")
def authors_page():
    autores = autores_service.get_all_autores()

    return render_template("author.html", autores=autores)
