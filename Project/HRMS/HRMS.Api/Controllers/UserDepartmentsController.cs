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
    builder.EntitySet<UserDepartment>("UserDepartments");
    builder.EntitySet<Department>("Departments"); 
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class UserDepartmentsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/UserDepartments
        [EnableQuery]
        public IQueryable<UserDepartment> GetUserDepartments()
        {
            return db.UserDepartments;
        }

        // GET: odata/UserDepartments(5)
        [EnableQuery]
        public SingleResult<UserDepartment> GetUserDepartment([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserDepartments.Where(userDepartment => userDepartment.UserDepartmentID == key));
        }

        // PUT: odata/UserDepartments(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<UserDepartment> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDepartment userDepartment = db.UserDepartments.Find(key);
            if (userDepartment == null)
            {
                return NotFound();
            }

            patch.Put(userDepartment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDepartmentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userDepartment);
        }

        // POST: odata/UserDepartments
        public IHttpActionResult Post(UserDepartment userDepartment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserDepartments.Add(userDepartment);
            db.SaveChanges();

            return Created(userDepartment);
        }

        // PATCH: odata/UserDepartments(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserDepartment> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDepartment userDepartment = db.UserDepartments.Find(key);
            if (userDepartment == null)
            {
                return NotFound();
            }

            patch.Patch(userDepartment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDepartmentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userDepartment);
        }

        // DELETE: odata/UserDepartments(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserDepartment userDepartment = db.UserDepartments.Find(key);
            if (userDepartment == null)
            {
                return NotFound();
            }

            db.UserDepartments.Remove(userDepartment);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserDepartments(5)/Department
        [EnableQuery]
        public SingleResult<Department> GetDepartment([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserDepartments.Where(m => m.UserDepartmentID == key).Select(m => m.Department));
        }

        // GET: odata/UserDepartments(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserDepartments.Where(m => m.UserDepartmentID == key).Select(m => m.User));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserDepartmentExists(int key)
        {
            return db.UserDepartments.Count(e => e.UserDepartmentID == key) > 0;
        }
    }
}
