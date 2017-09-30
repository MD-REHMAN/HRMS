using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using HRMS.Data;
using HRMS.Api.Models;

namespace HRMS.Api.Controllers
{
    [RoutePrefix("api/LeaveTypesWeb")]
    public class LeaveTypesWebController : ApiController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: api/LeaveTypesWeb
        public IQueryable<LeaveType> GetLeaveTypes()
        {
            return db.LeaveTypes;
        }

        // GET: api/LeaveTypesWeb/5
        [ResponseType(typeof(LeaveType))]
        public IHttpActionResult GetLeaveType(int id)
        {
            LeaveType leaveType = db.LeaveTypes.Find(id);
            if (leaveType == null)
            {
                return NotFound();
            }

            return Ok(leaveType);
        }

        // PUT: api/LeaveTypesWeb/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeaveType(int id, LeaveType leaveType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != leaveType.LeaveTypeID)
            {
                return BadRequest();
            }

            db.Entry(leaveType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/LeaveTypesWeb
        [ResponseType(typeof(LeaveType))]
        public IHttpActionResult PostLeaveType(LeaveType leaveType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LeaveTypes.Add(leaveType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = leaveType.LeaveTypeID }, leaveType);
        }

        [Route("AddLeaveTypeAllUser")]
        [HttpPost]
        public IHttpActionResult AddLeaveTypeAllUser(AddLeaveTypeUser data)
        {
            LeaveTypesController ltC = new LeaveTypesController();
            LeaveType lt = new LeaveType();
            lt.CreatedBy = data.CreatedBy;
            lt.CreatedDate = data.CreatedDate;
            lt.Description = data.Description;
            lt.IsActive = data.IsActive;
            lt.Name = data.Name;
            lt.PerAnnumLeave = data.PerAnnumLeave;
            lt.UpdatedBy = data.UpdatedBy;
            lt.UpdatedDate = data.UpdatedDate;
            ltC.Post(lt);

            if (lt.LeaveTypeID > 0)
            {
                var allUsers = db.Users.AsNoTracking().ToList();
                if(allUsers.Count > 0 )
                {
                    foreach(User item in allUsers){
                        string uID = "";
                        uID = item.UserID;
                        UserLeavesController ulc = new UserLeavesController();
                        UserLeave ul = new UserLeave();
                        ul.UserID = item.UserID;
                        ul.NumberOfLeave = lt.PerAnnumLeave;
                        ul.LeaveTypeID = lt.LeaveTypeID;
                        ulc.Post(ul);
                    }

                }

            }


            return Ok();
        }





        // DELETE: api/LeaveTypesWeb/5
        [ResponseType(typeof(LeaveType))]
        public IHttpActionResult DeleteLeaveType(int id)
        {
            LeaveType leaveType = db.LeaveTypes.Find(id);
            if (leaveType == null)
            {
                return NotFound();
            }

            db.LeaveTypes.Remove(leaveType);
            db.SaveChanges();

            return Ok(leaveType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeaveTypeExists(int id)
        {
            return db.LeaveTypes.Count(e => e.LeaveTypeID == id) > 0;
        }
    }
}