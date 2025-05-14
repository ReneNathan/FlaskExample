from flask import Blueprint, render_template

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
    return render_template("index.html")
