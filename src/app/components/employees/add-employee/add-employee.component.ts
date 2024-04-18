import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  newEmployee: Employee = {
    id: '', // You can generate this on the server or use UUID library
    name: '',
    email: '',
    phone: 0, // Assuming phone is a number
    salary: 0,
    department: ''
  };
  constructor(private employeeservice:EmployeesService) { }

  ngOnInit(): void {
    
  }
  AddEmployee(): void {
    console.log(this.newEmployee);
    this.employeeservice.AddEmployee(this.newEmployee).subscribe(
      {
        next:(employees)=>{
          console.log(employees);
        },
        error:(response)=>{
          console.log(response);
        }
      }
    );
    this.resetForm();
  }

  resetForm(): void {
    this.newEmployee = {
      id: '',
      name: '',
      email: '',
      phone: 0,
      salary: 0,
      department: ''
    };
  }
}
