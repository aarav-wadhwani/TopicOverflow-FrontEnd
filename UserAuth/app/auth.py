# app/auth.py
from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .database import get_db
from .models import User
from .schemas import UserCreate, UserLogin

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/signup")
def signup(
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    educational_institution: str = Form(...),
    other_institution: str = Form(None),  # This will be None if not provided
    expected_graduation_year: int = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    if educational_institution == "Other" and other_institution:
        educational_institution = other_institution
    
    user_exists = db.query(User).filter(User.email == email).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        educational_institution=educational_institution,
        expected_graduation_year=expected_graduation_year,
        password_hash=get_password_hash(password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
@router.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not verify_password(password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}
