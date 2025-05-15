from flask import Blueprint, render_template, request, jsonify
from app.service import autores_service, generos_service, livros_service

home_bp = Blueprint(
    "home",
    __name__,
    template_folder="templates",
    static_folder="static",  # <--- precisa disso
    static_url_path="/home/static",  # <--- define a URL para os arquivos estáticos
    url_prefix="/",
)


@home_bp.route("/")
def index():
    autores = autores_service.get_all_autores()
    generos = generos_service.get_all_generos()

    return render_template("index.html", autores=autores, generos=generos)


@home_bp.route("/livros/cadastrar/<int:quantidade>", methods=["POST"])
def cadastrar_livro(quantidade):
    livro = request.get_json()  # Usar get_json() em vez de form
    result = livros_service.cadastrar_livro(livro, quantidade)
    if result:
        return jsonify(success=True, livro=result)
    else:
        return jsonify(success=False), 400
