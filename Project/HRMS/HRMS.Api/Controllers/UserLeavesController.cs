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
    builder.EntitySet<UserLeave>("UserLeaves");
    builder.EntitySet<LeaveType>("LeaveTypes"); 
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class UserLeavesController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/UserLeaves
        [EnableQuery]
        public IQueryable<UserLeave> GetUserLeaves()
        {
            return db.UserLeaves;
        }

        // GET: odata/UserLeaves(5)
        [EnableQuery]
        public SingleResult<UserLeave> GetUserLeave([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserLeaves.Where(userLeave => userLeave.UserLeaveID == key));
        }

        // PUT: odata/UserLeaves(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<UserLeave> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserLeave userLeave = db.UserLeaves.Find(key);
            if (userLeave == null)
            {
                return NotFound();
            }

            patch.Put(userLeave);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLeaveExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userLeave);
        }

        // POST: odata/UserLeaves
        public IHttpActionResult Post(UserLeave userLeave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserLeaves.Add(userLeave);
            db.SaveChanges();

            return Created(userLeave);
        }

        // PATCH: odata/UserLeaves(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserLeave> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserLeave userLeave = db.UserLeaves.Find(key);
            if (userLeave == null)
            {
                return NotFound();
            }

            patch.Patch(userLeave);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLeaveExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userLeave);
        }

        // DELETE: odata/UserLeaves(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserLeave userLeave = db.UserLeaves.Find(key);
            if (userLeave == null)
            {
                return NotFound();
            }

            db.UserLeaves.Remove(userLeave);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserLeaves(5)/LeaveType
        [EnableQuery]
        public SingleResult<LeaveType> GetLeaveType([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserLeaves.Where(m => m.UserLeaveID == key).Select(m => m.LeaveType));
        }

        // GET: odata/UserLeaves(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserLeaves.Where(m => m.UserLeaveID == key).Select(m => m.User));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserLeaveExists(int key)
        {
            return db.UserLeaves.Count(e => e.UserLeaveID == key) > 0;
        }
    }
}
