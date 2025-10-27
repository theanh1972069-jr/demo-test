from pydantic import BaseModel
from app.schemas.teacher import TeacherInDB


class ClassBase(BaseModel):
    name: str
    teacher_id: int


class ClassCreate(ClassBase):
    pass


class ClassUpdate(ClassBase):
    pass


class ClassInDB(ClassBase):
    id: int
    teacher: TeacherInDB

    class Config:
        from_attributes = True
