from sqlalchemy import Column, Integer, String, Boolean

try:
    from app.db import Base
except ModuleNotFoundError:
    from .db import Base  # fallback when running inside the app package

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
