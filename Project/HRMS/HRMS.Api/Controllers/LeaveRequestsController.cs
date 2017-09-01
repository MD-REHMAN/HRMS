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
    builder.EntitySet<LeaveRequest>("LeaveRequests");
    builder.EntitySet<User>("Users"); 
    builder.EntitySet<LeaveType>("LeaveTypes"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class LeaveRequestsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/LeaveRequests
        [EnableQuery]
        public IQueryable<LeaveRequest> GetLeaveRequests()
        {
            return db.LeaveRequests;
        }

        // GET: odata/LeaveRequests(5)
        [EnableQuery]
        public SingleResult<LeaveRequest> GetLeaveRequest([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveRequests.Where(leaveRequest => leaveRequest.LeaveRequestID == key));
        }

        // PUT: odata/LeaveRequests(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<LeaveRequest> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LeaveRequest leaveRequest = db.LeaveRequests.Find(key);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            patch.Put(leaveRequest);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveRequestExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(leaveRequest);
        }

        // POST: odata/LeaveRequests
        public IHttpActionResult Post(LeaveRequest leaveRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LeaveRequests.Add(leaveRequest);
            db.SaveChanges();

            return Created(leaveRequest);
        }

        // PATCH: odata/LeaveRequests(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<LeaveRequest> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LeaveRequest leaveRequest = db.LeaveRequests.Find(key);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            patch.Patch(leaveRequest);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveRequestExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(leaveRequest);
        }

        // DELETE: odata/LeaveRequests(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            LeaveRequest leaveRequest = db.LeaveRequests.Find(key);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            db.LeaveRequests.Remove(leaveRequest);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/LeaveRequests(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveRequests.Where(m => m.LeaveRequestID == key).Select(m => m.User));
        }

        // GET: odata/LeaveRequests(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveRequests.Where(m => m.LeaveRequestID == key).Select(m => m.User1));
        }

        // GET: odata/LeaveRequests(5)/LeaveType
        [EnableQuery]
        public SingleResult<LeaveType> GetLeaveType([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveRequests.Where(m => m.LeaveRequestID == key).Select(m => m.LeaveType));
        }

        // GET: odata/LeaveRequests(5)/User2
        [EnableQuery]
        public SingleResult<User> GetUser2([FromODataUri] int key)
        {
            return SingleResult.Create(db.LeaveRequests.Where(m => m.LeaveRequestID == key).Select(m => m.User2));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeaveRequestExists(int key)
        {
            return db.LeaveRequests.Count(e => e.LeaveRequestID == key) > 0;
        }
    }
}
