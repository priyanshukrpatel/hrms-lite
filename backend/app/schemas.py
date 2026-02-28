from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Literal


class EmployeeCreate(BaseModel):
    employee_code: str
    name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    employee_code: str
    name: str
    email: EmailStr
    department: str

    class Config:
        from_attributes = True


class AttendanceCreate(BaseModel):
    employee_code: str
    status: str


class AttendanceResponse(BaseModel):
    id: int
    employee_code: str
    status: str
    date: date

    class Config:
        from_attributes = True