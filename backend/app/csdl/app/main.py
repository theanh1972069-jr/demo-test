from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from app.database.database import engine, SessionLocal
from app.database.base_class import Base as ModelBase
import app.database.base

from app.models.student import Student
from app.models.teacher import Teacher
from app.models.class_ import Class
from app.models.semester import Semester
from app.models.student_class import StudentClass

from app.schemas.student import StudentCreate, StudentInDB
from app.schemas.teacher import TeacherCreate, TeacherInDB
from app.schemas.class_ import ClassCreate, ClassInDB
from app.schemas.semester import SemesterCreate, SemesterInDB
from app.schemas.student_class import StudentClassCreate, StudentClassInDB

app = FastAPI()


@app.get("/")
def root():
    return {"message": "hello"}


ModelBase.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DBSession = Annotated[Session, Depends(get_db)]

# test run


@app.get("/health")
def health():
    return {"status": "ok"}


# student
@app.post("/students/", status_code=status.HTTP_201_CREATED, response_model=StudentInDB)
def create_student(student: StudentCreate, db: DBSession):
    db_student = Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


@app.get("/students/{student_id}", response_model=StudentInDB)
def read_student(student_id: int, db: DBSession):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


# teacher
@app.post("/teachers/", status_code=status.HTTP_201_CREATED, response_model=TeacherInDB)
def create_teacher(teacher: TeacherCreate, db: DBSession):
    db_teacher = Teacher(**teacher.dict())
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher


@app.get("/teachers/{teacher_id}", response_model=TeacherInDB)
def read_teacher(teacher_id: int, db: DBSession):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher


# class
@app.post("/classes/", status_code=status.HTTP_201_CREATED, response_model=ClassInDB)
def create_class(class_: ClassCreate, db: DBSession):
    db_class = Class(**class_.dict())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class


@app.get("/classes/{class_id}", response_model=ClassInDB)
def read_class(class_id: int, db: DBSession):
    class_ = db.query(Class).filter(Class.id == class_id).first()
    if not class_:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_


# semester
@app.post("/semesters/", status_code=status.HTTP_201_CREATED, response_model=SemesterInDB)
def create_semester(semester: SemesterCreate, db: DBSession):
    db_semester = Semester(**semester.dict())
    db.add(db_semester)
    db.commit()
    db.refresh(db_semester)
    return db_semester


@app.get("/semesters/{semester_id}", response_model=SemesterInDB)
def read_semester(semester_id: int, db: DBSession):
    semester = db.query(Semester).filter(Semester.id == semester_id).first()
    if not semester:
        raise HTTPException(status_code=404, detail="Semester not found")
    return semester


# student_class
@app.post("/student-classes/", status_code=status.HTTP_201_CREATED, response_model=StudentClassInDB)
def create_student_class(student_class: StudentClassCreate, db: DBSession):
    db_entry = StudentClass(**student_class.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@app.get("/student-classes/{student_id}/{class_id}/{semester_id}", response_model=StudentClassInDB)
def read_student_class(student_id: int, class_id: int, semester_id: int, db: DBSession):
    entry = db.query(StudentClass).filter(
        StudentClass.student_id == student_id,
        StudentClass.class_id == class_id,
        StudentClass.semester_id == semester_id
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="StudentClass not found")
    return entry
