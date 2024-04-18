import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiUrl = "https://localhost:7048";
  constructor(private http:HttpClient) { }
  getAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+"/api/Employees");
  }
  AddEmployee(employee:Employee):Observable<Employee>{

    employee.id = '00000000-0000-0000-0000-000000000000';
    console.log(employee);
    return this.http.post<Employee>(this.apiUrl+"/api/Employees",employee);
  }
  getEmployeeById(employeeId:string):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+"/api/Employees/"+employeeId);
  }
  updateEmployee(employeeId:string, employee:Employee):Observable<Employee>{
    console.log(employeeId);
    console.log(employee);
    return this.http.put<Employee>(this.apiUrl+"/api/Employees/"+employeeId,employee);
  }
  deleteEmployee(employeeId:string):Observable<Employee>{
    return this.http.delete<Employee>(this.apiUrl+"/api/Employees/"+employeeId);
  }
}
