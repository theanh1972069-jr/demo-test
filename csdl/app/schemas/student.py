import re
from datetime import date, datetime
from pydantic import BaseModel, validator


class StudentBase(BaseModel):
    student_id: str
    fullname: str
    firstname: str
    gender: bool
    date_of_birth: date
    phone: str
    guardian: str | None = None
    guardian_phone: str | None = None
    admission_date: date | None = None

    @validator("fullname", "firstname", pre=True)
    def validate_name(cls, value: str):
        value = value.strip()
        if not value:
            raise ValueError("Name fields must not be empty.")
        return value

    @validator("phone")
    def validate_phone(cls, value: str):
        value = value.strip()
        if not re.match(r"^\d{9,15}$", value):
            raise ValueError("Please enter a valid phone number.")
        return value

    @validator("guardian_phone", always=True)
    def validate_guardian_phone(cls, value):
        if value and not re.match(r"^\d{9,15}$", value):
            raise ValueError("Please enter a valid guardian phone number.")
        return value

    @validator("date_of_birth", pre=True)
    def parse_date_of_birth(cls, value):
        if isinstance(value, date):
            return value
        return datetime.strptime(value, "%Y-%m-%d").date()

    @validator("admission_date", pre=True, always=True)
    def parse_admission_date(cls, value):
        if not value:
            return date.today()
        if isinstance(value, date):
            return value
        return datetime.strptime(value, "%Y-%m-%d").date()


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass


class StudentInDB(StudentBase):
    id: int

    class Config:
        from_attributes = True
