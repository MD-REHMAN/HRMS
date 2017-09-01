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
    builder.EntitySet<LeaveType>("LeaveTypes");
    builder.EntitySet<LeaveRequest>("LeaveRequests"); 
    builder.EntitySet<User>("Users"); 
    builder.EntitySet<UserLeave>("UserLeaves"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class LeaveTypesController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/LeaveTypes
        [EnableQuery]
        public IQueryable<LeaveType> GetLeaveTypes()
        {
            return db.LeaveTypes;
        }

        // GET: odata/LeaveTypes(5)
        [EnableQuery]
        public SingleResult<LeaveType> GetLeaveType([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveTypes.Where(leaveType => leaveType.LeaveTypeID == key));
        }

        // PUT: odata/LeaveTypes(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<LeaveType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LeaveType leaveType = db.LeaveTypes.Find(key);
            if (leaveType == null)
            {
                return NotFound();
            }

            patch.Put(leaveType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(leaveType);
        }

        // POST: odata/LeaveTypes
        public IHttpActionResult Post(LeaveType leaveType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LeaveTypes.Add(leaveType);
            db.SaveChanges();

            return Created(leaveType);
        }

        // PATCH: odata/LeaveTypes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<LeaveType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LeaveType leaveType = db.LeaveTypes.Find(key);
            if (leaveType == null)
            {
                return NotFound();
            }

            patch.Patch(leaveType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(leaveType);
        }

        // DELETE: odata/LeaveTypes(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            LeaveType leaveType = db.LeaveTypes.Find(key);
            if (leaveType == null)
            {
                return NotFound();
            }

            db.LeaveTypes.Remove(leaveType);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/LeaveTypes(5)/LeaveRequests
        [EnableQuery]
        public IQueryable<LeaveRequest> GetLeaveRequests([FromODataUri] int key)
        {
            return db.LeaveTypes.Where(m => m.LeaveTypeID == key).SelectMany(m => m.LeaveRequests);
        }

        // GET: odata/LeaveTypes(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveTypes.Where(m => m.LeaveTypeID == key).Select(m => m.User));
        }

        // GET: odata/LeaveTypes(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveTypes.Where(m => m.LeaveTypeID == key).Select(m => m.User1));
        }

        // GET: odata/LeaveTypes(5)/UserLeaves
        [EnableQuery]
        public IQueryable<UserLeave> GetUserLeaves([FromODataUri] int key)
        {
            return db.LeaveTypes.Where(m => m.LeaveTypeID == key).SelectMany(m => m.UserLeaves);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeaveTypeExists(int key)
        {
            return db.LeaveTypes.Count(e => e.LeaveTypeID == key) > 0;
        }
    }
}
