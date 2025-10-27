# app/db/base.py

# Import TẤT CẢ các Models của dự án để Alembic có thể thấy chúng
from app.models.grade import Grade
from app.models.subject import Subject
from app.models.grade_subject import GradeSubject
from app.models.school_year import SchoolYear
from app.models.student import Student
from app.models.registration import Registration
from app.models.nationality import Nationality