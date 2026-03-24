# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy import create_engine
# from db import get_db, SQLALCHEMY_DATABASE_URL

# from ComptaPro import row_to_dict

# newuser = {
#     "username": "newuser",      
#     "email": "newuser@example.com",
#     "password": "newpassword",
#     "role": "user",
#     "created_at": "2024-06-01T12:00:00"
# }

# @router.post("/newuser")
# def create_user(data: dict, db: Session = Depends(get_db)):
#     if not user:
#         raise HTTPException(status_code=404, detail="Table user not found")
#     user = user(**data)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return row_to_dict(user)