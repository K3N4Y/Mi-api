## Mi API

API REST construida con FastAPI que ofrece flujo básico de autenticación (registro, login con JWT y perfil del usuario autenticado) respaldado por PostgreSQL y SQLAlchemy.

## Características
- FastAPI + Pydantic para validar y documentar los endpoints.
- Autenticación con contraseñas encriptadas vía `bcrypt` y emisión de tokens JWT.
- Persistencia con SQLAlchemy y PostgreSQL (driver `psycopg`).
- Dependencias gestionadas mediante `requirements.txt` y scripts `uvicorn`/`fastapi` para desarrollo.

##  Stack principal
| Capa        | Tecnología |
|-------------|------------|
| Framework   | FastAPI    |
| ORM         | SQLAlchemy |
| DB          | PostgreSQL |
| Auth        | OAuth2 Password + JWT |

##  Estructura del proyecto
```
app/
├── core/          # Seguridad (hashing, JWT, dependencias de auth)
├── db.py          # Conexion y SessionLocal
├── main.py        # Punto de entrada de FastAPI
├── models.py      # Modelos SQLAlchemy
├── routers/       # Rutas (auth, users, ...)
├── schemas.py     # Esquemas Pydantic
└── test/          # Pruebas
```

##  Configuración
### Variables de entorno
| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DATABASE_URL` | Cadena de conexión SQLAlchemy | `postgresql+psycopg://postgres:k3n4y123@localhost:4000/world` |
| `SECRET_KEY` | Clave para firmar JWT | `CAMBIAME` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Minutos de vigencia del token | `60` |

> **Tip:** crea un archivo `.env` en la raíz y FastAPI lo recogerá si usas `python-dotenv` o lo cargas desde tu shell antes de iniciar.

### Requisitos previos
- Python 3.11+
- PostgreSQL en ejecución (local o remoto)

### Instalación
```powershell
# 1. Crear entorno virtual (opcional pero recomendado)
python -m venv .venv
.\.venv\Scripts\activate

# 2. Instalar dependencias
pip install --upgrade pip
pip install -r requirements.txt
```

## ▶ Ejecutar el servidor
Desde la raíz del repositorio (`Mi-api`):
```powershell
python -m uvicorn app.main:app --reload
# o
python -m fastapi dev app/main.py
```
La documentación interactiva estará disponible en `http://localhost:8000/docs` y la versión alternativa en `http://localhost:8000/redoc`.

##  Pruebas
Si existen pruebas en `app/test`, puedes ejecutarlas con:
```powershell
pytest
```

##  Endpoints principales
| Método | Ruta            | Descripción |
|--------|-----------------|-------------|
| POST   | `/auth/register`| Crea un usuario nuevo. |
| POST   | `/auth/login`   | Retorna `access_token` JWT. |
| GET    | `/auth/me`      | Devuelve el usuario autenticado (requiere `Authorization: Bearer <token>`). |

##  Desarrollo futuro
- Añadir CRUD completo de usuarios
- Integrar Alembic para migraciones automáticas
- Cobertura de pruebas para flujos de autenticación

