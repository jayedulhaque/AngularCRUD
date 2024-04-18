using Fullstack.Api.Data;
using Fullstack.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fullstack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDBContext _appDBContext;

        public EmployeesController(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _appDBContext.Employees.AddAsync(employeeRequest);
            await _appDBContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeList()
        {
            var employees = await _appDBContext.Employees.ToListAsync();
            return Ok(employees);
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployeeById([FromRoute]Guid id)
        {
            var employee = await _appDBContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployeeAsync([FromRoute] Guid id, Employee model)
        {
            var employee = await _appDBContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.Name = model.Name;
            employee.Email = model.Email;
            employee.Phone = model.Phone;
            employee.Department = model.Department;
            employee.Salary = model.Salary;

            await _appDBContext.SaveChangesAsync();
            return Ok(employee);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployeeByIdAsync([FromRoute] Guid id)
        {
            var employee = await _appDBContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _appDBContext.Employees.Remove(employee);
            await _appDBContext.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
