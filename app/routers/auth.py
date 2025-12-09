from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import UserCreate, UserOut
from app.models import User
from app.db import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut, status_code=201)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya esta registrado")

    new_user = User(
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(data: UserCreate, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    token = create_access_token({"sub": str(user.id)})

    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
