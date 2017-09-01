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
    builder.EntitySet<User>("Users");
    builder.EntitySet<CompanyBranch>("CompanyBranches"); 
    builder.EntitySet<Department>("Departments"); 
    builder.EntitySet<PaySlip>("PaySlips"); 
    builder.EntitySet<SalaryComponent>("SalaryComponents"); 
    builder.EntitySet<SalaryComponentAmount>("SalaryComponentAmounts"); 
    builder.EntitySet<UserDepartment>("UserDepartments"); 
    builder.EntitySet<UserRole>("UserRoles"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class UsersController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/Users
        [EnableQuery(MaxExpansionDepth = 4)]
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: odata/Users(5)
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] string key)
        {
            return SingleResult.Create(db.Users.Where(user => user.UserID == key));
        }

        // PUT: odata/Users(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<User> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = db.Users.Find(key);
            if (user == null)
            {
                return NotFound();
            }

            patch.Put(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        // POST: odata/Users
        public IHttpActionResult Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(user);
        }

        // PATCH: odata/Users(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<User> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = db.Users.Find(key);
            if (user == null)
            {
                return NotFound();
            }

            patch.Patch(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        // DELETE: odata/Users(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            User user = db.Users.Find(key);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Users(5)/CompanyBranch
        [EnableQuery]
        public SingleResult<CompanyBranch> GetCompanyBranch([FromODataUri] string key)
        {
            return SingleResult.Create(db.Users.Where(m => m.UserID == key).Select(m => m.CompanyBranch));
        }

        // GET: odata/Users(5)/Departments
        [EnableQuery]
        public IQueryable<Department> GetDepartments([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.Departments);
        }

        // GET: odata/Users(5)/Departments1
        [EnableQuery]
        public IQueryable<Department> GetDepartments1([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.Departments1);
        }

        // GET: odata/Users(5)/PaySlips
        [EnableQuery]
        public IQueryable<PaySlip> GetPaySlips([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.PaySlips);
        }

        // GET: odata/Users(5)/PaySlips1
        [EnableQuery]
        public IQueryable<PaySlip> GetPaySlips1([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.PaySlips1);
        }

        // GET: odata/Users(5)/SalaryComponents
        [EnableQuery]
        public IQueryable<SalaryComponent> GetSalaryComponents([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.SalaryComponents);
        }

        // GET: odata/Users(5)/SalaryComponents1
        [EnableQuery]
        public IQueryable<SalaryComponent> GetSalaryComponents1([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.SalaryComponents1);
        }

        // GET: odata/Users(5)/SalaryComponentAmounts
        [EnableQuery]
        public IQueryable<SalaryComponentAmount> GetSalaryComponentAmounts([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.SalaryComponentAmounts);
        }

        // GET: odata/Users(5)/SalaryComponentAmounts1
        [EnableQuery]
        public IQueryable<SalaryComponentAmount> GetSalaryComponentAmounts1([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.SalaryComponentAmounts1);
        }

        // GET: odata/Users(5)/UserDepartments
        [EnableQuery]
        public IQueryable<UserDepartment> GetUserDepartments([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.UserDepartments);
        }

        // GET: odata/Users(5)/UserRoles
        [EnableQuery]
        public IQueryable<UserRole> GetUserRoles([FromODataUri] string key)
        {
            return db.Users.Where(m => m.UserID == key).SelectMany(m => m.UserRoles);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string key)
        {
            return db.Users.Count(e => e.UserID == key) > 0;
        }
    }
}
