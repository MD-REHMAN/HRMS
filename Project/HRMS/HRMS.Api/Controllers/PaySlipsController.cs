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
    builder.EntitySet<PaySlip>("PaySlips");
    builder.EntitySet<User>("Users"); 
    builder.EntitySet<SalaryComponentAmount>("SalaryComponentAmounts"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class PaySlipsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/PaySlips
        [EnableQuery]
        public IQueryable<PaySlip> GetPaySlips()
        {
            return db.PaySlips;
        }

        // GET: odata/PaySlips(5)
        [EnableQuery]
        public SingleResult<PaySlip> GetPaySlip([FromODataUri] int key)
        {
            return SingleResult.Create(db.PaySlips.Where(paySlip => paySlip.PaySlipID == key));
        }

        // PUT: odata/PaySlips(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<PaySlip> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaySlip paySlip = db.PaySlips.Find(key);
            if (paySlip == null)
            {
                return NotFound();
            }

            patch.Put(paySlip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaySlipExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paySlip);
        }

        // POST: odata/PaySlips
        public IHttpActionResult Post(PaySlip paySlip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PaySlips.Add(paySlip);
            db.SaveChanges();

            return Created(paySlip);
        }

        // PATCH: odata/PaySlips(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<PaySlip> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaySlip paySlip = db.PaySlips.Find(key);
            if (paySlip == null)
            {
                return NotFound();
            }

            patch.Patch(paySlip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaySlipExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paySlip);
        }

        // DELETE: odata/PaySlips(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            PaySlip paySlip = db.PaySlips.Find(key);
            if (paySlip == null)
            {
                return NotFound();
            }

            db.PaySlips.Remove(paySlip);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/PaySlips(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.PaySlips.Where(m => m.PaySlipID == key).Select(m => m.User));
        }

        // GET: odata/PaySlips(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.PaySlips.Where(m => m.PaySlipID == key).Select(m => m.User1));
        }

        // GET: odata/PaySlips(5)/SalaryComponentAmounts
        [EnableQuery]
        public IQueryable<SalaryComponentAmount> GetSalaryComponentAmounts([FromODataUri] int key)
        {
            return db.PaySlips.Where(m => m.PaySlipID == key).SelectMany(m => m.SalaryComponentAmounts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaySlipExists(int key)
        {
            return db.PaySlips.Count(e => e.PaySlipID == key) > 0;
        }
    }
}
