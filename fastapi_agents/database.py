from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship
from fastapi import Query, Depends
from datetime import datetime
from typing import Annotated, List, Optional
import uuid
class User(SQLModel, table=True):
    email: str = Field(primary_key=True)
    created_at : datetime = Field(default_factory=datetime.utcnow)
    chat_history: List["ChatHistory"] = Relationship(back_populates="user")
class ChatHistory(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    file_key: str
    response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_email: str = Field(foreign_key="user.email")
    user: Optional[User] = Relationship(back_populates="chat_history")

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
def get_session():
    with Session(engine) as session:
        yield session
SessionDep = Annotated[Session, Depends(get_session)]
    

