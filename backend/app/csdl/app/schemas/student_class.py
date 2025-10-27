from pydantic import BaseModel
from app.schemas.student import StudentInDB
from app.schemas.class_ import ClassInDB
from app.schemas.semester import SemesterInDB


class StudentClassBase(BaseModel):
    student_id: int
    class_id: int
    semester_id: int
    grade: float | None = None


class StudentClassCreate(StudentClassBase):
    pass


class StudentClassUpdate(StudentClassBase):
    pass


class StudentClassInDB(StudentClassBase):
    student: StudentInDB
    class_: ClassInDB
    semester: SemesterInDB

    class Config:
        from_attributes = True
