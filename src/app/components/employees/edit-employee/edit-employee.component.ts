import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  newEmployee: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('id');
      if(employeeId)
      {
        this.employeeService.getEmployeeById(employeeId).subscribe(
          (employee: Employee) => {
            this.newEmployee = employee;
          },
          (error:any) => {
            console.error('Error fetching employee details:', error);
            // Handle error (e.g., display error message, navigate to error page)
          }
        );
      }
      // Assuming you have a method in your service to fetch employee details by ID
      
    });
  }

  editEmployee(): void {
    // Assuming you have a method in your service to update employee details
    this.employeeService.updateEmployee(this.newEmployee.id,this.newEmployee).subscribe(
      () => {
        console.log('Employee updated successfully');
        // Navigate to employee list page or any other page after successful update
        this.router.navigate(['/employees']);
      },
      (error:any) => {
        console.error('Error updating employee:', error);
        // Handle error (e.g., display error message, navigate to error page)
      }
    );
  }
  deleteEmployee(id:string)
  {
    this.employeeService.deleteEmployee(id).subscribe(
      {
        next: (response) =>{
          this.router.navigate(['/employees']);
        }
      }
    );
  }
}
