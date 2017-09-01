using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using HRMS.Data;

namespace HRMS.Api.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using HRMS.Data;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Department>("Departments");
    builder.EntitySet<User>("Users"); 
    builder.EntitySet<UserDepartment>("UserDepartments"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class DepartmentsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/Departments
        [EnableQuery]
        public IQueryable<Department> GetDepartments()
        {
            return db.Departments;
        }

        // GET: odata/Departments(5)
        [EnableQuery]
        public SingleResult<Department> GetDepartment([FromODataUri] int key)
        {
            return SingleResult.Create(db.Departments.Where(department => department.DepartmentID == key));
        }

        // PUT: odata/Departments(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Department> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Department department = db.Departments.Find(key);
            if (department == null)
            {
                return NotFound();
            }

            patch.Put(department);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(department);
        }

        // POST: odata/Departments
        public IHttpActionResult Post(Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Departments.Add(department);
            db.SaveChanges();

            return Created(department);
        }

        // PATCH: odata/Departments(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Department> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Department department = db.Departments.Find(key);
            if (department == null)
            {
                return NotFound();
            }

            patch.Patch(department);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(department);
        }

        // DELETE: odata/Departments(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Department department = db.Departments.Find(key);
            if (department == null)
            {
                return NotFound();
            }

            db.Departments.Remove(department);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Departments(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.Departments.Where(m => m.DepartmentID == key).Select(m => m.User));
        }

        // GET: odata/Departments(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.Departments.Where(m => m.DepartmentID == key).Select(m => m.User1));
        }

        // GET: odata/Departments(5)/UserDepartments
        [EnableQuery]
        public IQueryable<UserDepartment> GetUserDepartments([FromODataUri] int key)
        {
            return db.Departments.Where(m => m.DepartmentID == key).SelectMany(m => m.UserDepartments);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DepartmentExists(int key)
        {
            return db.Departments.Count(e => e.DepartmentID == key) > 0;
        }
    }
}
