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
    builder.EntitySet<UserRole>("UserRoles");
    builder.EntitySet<Role>("Roles"); 
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class UserRolesController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/UserRoles
        [EnableQuery]
        public IQueryable<UserRole> GetUserRoles()
        {
            return db.UserRoles;
        }

        // GET: odata/UserRoles(5)
        [EnableQuery]
        public SingleResult<UserRole> GetUserRole([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserRoles.Where(userRole => userRole.UserRoleID == key));
        }

        // PUT: odata/UserRoles(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<UserRole> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserRole userRole = db.UserRoles.Find(key);
            if (userRole == null)
            {
                return NotFound();
            }

            patch.Put(userRole);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRoleExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userRole);
        }

        // POST: odata/UserRoles
        public IHttpActionResult Post(UserRole userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserRoles.Add(userRole);
            db.SaveChanges();

            return Created(userRole);
        }

        // PATCH: odata/UserRoles(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserRole> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserRole userRole = db.UserRoles.Find(key);
            if (userRole == null)
            {
                return NotFound();
            }

            patch.Patch(userRole);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRoleExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userRole);
        }

        // DELETE: odata/UserRoles(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserRole userRole = db.UserRoles.Find(key);
            if (userRole == null)
            {
                return NotFound();
            }

            db.UserRoles.Remove(userRole);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserRoles(5)/Role
        [EnableQuery]
        public SingleResult<Role> GetRole([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserRoles.Where(m => m.UserRoleID == key).Select(m => m.Role));
        }

        // GET: odata/UserRoles(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserRoles.Where(m => m.UserRoleID == key).Select(m => m.User));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserRoleExists(int key)
        {
            return db.UserRoles.Count(e => e.UserRoleID == key) > 0;
        }
    }
}
