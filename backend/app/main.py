from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from datetime import date
from . import models, schemas
from .schemas import (
    EmployeeCreate,
    EmployeeResponse,
    AttendanceCreate,
    AttendanceResponse,
)


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees", response_model=EmployeeResponse)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):

    # check duplicate employee_code
    existing_code = db.query(models.Employee).filter(
        models.Employee.employee_code == payload.employee_code
    ).first()

    if existing_code:
        raise HTTPException(status_code=400, detail="Employee code already exists")

    # check duplicate email
    existing_email = db.query(models.Employee).filter(
        models.Employee.email == payload.email
    ).first()

    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    employee = models.Employee(
        employee_code=payload.employee_code,
        name=payload.name,
        email=payload.email,
        department=payload.department
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee

        
@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()
    return employees

@app.delete("/employees/{employee_code}", status_code=204)
def delete_employee(employee_code: str, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.employee_code == employee_code
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()

    return


@app.post("/attendance", response_model=AttendanceResponse)
def mark_attendance(payload: AttendanceCreate, db: Session = Depends(get_db)):

    # check employee exists by employee_code
    employee = db.query(models.Employee).filter(
        models.Employee.employee_code == payload.employee_code
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    attendance = models.Attendance(
        employee_code=employee.employee_code,  # use code
        status=payload.status,
        date=date.today()
    )


    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance

@app.get("/attendance", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()



@app.get("/employees/summary")
def employees_summary(db: Session = Depends(get_db)):
    # Count employees per department
    dept_counts = (
        db.query(models.Employee.department, func.count(models.Employee.id))
        .group_by(models.Employee.department)
        .all()
    )
    return {dept: count for dept, count in dept_counts}



@app.get("/attendance/today")
def attendance_today(db: Session = Depends(get_db)):
    today = date.today()
    present_count = db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == "Present"
    ).count()
    absent_count = db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == "Absent"
    ).count()

    return {
        "present": present_count,
        "absent": absent_count
    }