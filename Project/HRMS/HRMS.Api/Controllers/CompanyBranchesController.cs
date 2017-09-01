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
    builder.EntitySet<CompanyBranch>("CompanyBranches");
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CompanyBranchesController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/CompanyBranches
        [EnableQuery]
        public IQueryable<CompanyBranch> GetCompanyBranches()
        {
            return db.CompanyBranches;
        }

        // GET: odata/CompanyBranches(5)
        [EnableQuery]
        public SingleResult<CompanyBranch> GetCompanyBranch([FromODataUri] int key)
        {
            return SingleResult.Create(db.CompanyBranches.Where(companyBranch => companyBranch.CompanyBranchID == key));
        }

        // PUT: odata/CompanyBranches(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<CompanyBranch> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CompanyBranch companyBranch = db.CompanyBranches.Find(key);
            if (companyBranch == null)
            {
                return NotFound();
            }

            patch.Put(companyBranch);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyBranchExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(companyBranch);
        }

        // POST: odata/CompanyBranches
        public IHttpActionResult Post(CompanyBranch companyBranch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CompanyBranches.Add(companyBranch);
            db.SaveChanges();

            return Created(companyBranch);
        }

        // PATCH: odata/CompanyBranches(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<CompanyBranch> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CompanyBranch companyBranch = db.CompanyBranches.Find(key);
            if (companyBranch == null)
            {
                return NotFound();
            }

            patch.Patch(companyBranch);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyBranchExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(companyBranch);
        }

        // DELETE: odata/CompanyBranches(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CompanyBranch companyBranch = db.CompanyBranches.Find(key);
            if (companyBranch == null)
            {
                return NotFound();
            }

            db.CompanyBranches.Remove(companyBranch);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/CompanyBranches(5)/Users
        [EnableQuery]
        public IQueryable<User> GetUsers([FromODataUri] int key)
        {
            return db.CompanyBranches.Where(m => m.CompanyBranchID == key).SelectMany(m => m.Users);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompanyBranchExists(int key)
        {
            return db.CompanyBranches.Count(e => e.CompanyBranchID == key) > 0;
        }
    }
}
