from flask import Flask


def create_app():
    app = Flask(__name__)

    # Registrar módulos (home, livros, autores)
    from app.modules.home.route import home_bp
    from app.modules.authors.route import authors_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(authors_bp)

    return app
