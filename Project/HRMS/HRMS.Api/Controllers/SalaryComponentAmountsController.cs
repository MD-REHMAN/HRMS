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
    builder.EntitySet<SalaryComponentAmount>("SalaryComponentAmounts");
    builder.EntitySet<PaySlip>("PaySlips"); 
    builder.EntitySet<SalaryComponent>("SalaryComponents"); 
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class SalaryComponentAmountsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/SalaryComponentAmounts
        [EnableQuery]
        public IQueryable<SalaryComponentAmount> GetSalaryComponentAmounts()
        {
            return db.SalaryComponentAmounts;
        }

        // GET: odata/SalaryComponentAmounts(5)
        [EnableQuery]
        public SingleResult<SalaryComponentAmount> GetSalaryComponentAmount([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponentAmounts.Where(salaryComponentAmount => salaryComponentAmount.SalaryComponentAmountID == key));
        }

        // PUT: odata/SalaryComponentAmounts(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<SalaryComponentAmount> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SalaryComponentAmount salaryComponentAmount = db.SalaryComponentAmounts.Find(key);
            if (salaryComponentAmount == null)
            {
                return NotFound();
            }

            patch.Put(salaryComponentAmount);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryComponentAmountExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(salaryComponentAmount);
        }

        // POST: odata/SalaryComponentAmounts
        public IHttpActionResult Post(SalaryComponentAmount salaryComponentAmount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SalaryComponentAmounts.Add(salaryComponentAmount);
            db.SaveChanges();

            return Created(salaryComponentAmount);
        }

        // PATCH: odata/SalaryComponentAmounts(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<SalaryComponentAmount> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SalaryComponentAmount salaryComponentAmount = db.SalaryComponentAmounts.Find(key);
            if (salaryComponentAmount == null)
            {
                return NotFound();
            }

            patch.Patch(salaryComponentAmount);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryComponentAmountExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(salaryComponentAmount);
        }

        // DELETE: odata/SalaryComponentAmounts(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            SalaryComponentAmount salaryComponentAmount = db.SalaryComponentAmounts.Find(key);
            if (salaryComponentAmount == null)
            {
                return NotFound();
            }

            db.SalaryComponentAmounts.Remove(salaryComponentAmount);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/SalaryComponentAmounts(5)/PaySlip
        [EnableQuery]
        public SingleResult<PaySlip> GetPaySlip([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponentAmounts.Where(m => m.SalaryComponentAmountID == key).Select(m => m.PaySlip));
        }

        // GET: odata/SalaryComponentAmounts(5)/SalaryComponent
        [EnableQuery]
        public SingleResult<SalaryComponent> GetSalaryComponent([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponentAmounts.Where(m => m.SalaryComponentAmountID == key).Select(m => m.SalaryComponent));
        }

        // GET: odata/SalaryComponentAmounts(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponentAmounts.Where(m => m.SalaryComponentAmountID == key).Select(m => m.User));
        }

        // GET: odata/SalaryComponentAmounts(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponentAmounts.Where(m => m.SalaryComponentAmountID == key).Select(m => m.User1));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SalaryComponentAmountExists(int key)
        {
            return db.SalaryComponentAmounts.Count(e => e.SalaryComponentAmountID == key) > 0;
        }
    }
}
