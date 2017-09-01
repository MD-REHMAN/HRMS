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
    builder.EntitySet<SalaryComponent>("SalaryComponents");
    builder.EntitySet<User>("Users"); 
    builder.EntitySet<SalaryComponentAmount>("SalaryComponentAmounts"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class SalaryComponentsController : ODataController
    {
        private HRMSEntities db = new HRMSEntities();

        // GET: odata/SalaryComponents
        [EnableQuery]
        public IQueryable<SalaryComponent> GetSalaryComponents()
        {
            return db.SalaryComponents;
        }

        // GET: odata/SalaryComponents(5)
        [EnableQuery]
        public SingleResult<SalaryComponent> GetSalaryComponent([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponents.Where(salaryComponent => salaryComponent.SalaryComponentID == key));
        }

        // PUT: odata/SalaryComponents(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<SalaryComponent> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SalaryComponent salaryComponent = db.SalaryComponents.Find(key);
            if (salaryComponent == null)
            {
                return NotFound();
            }

            patch.Put(salaryComponent);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryComponentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(salaryComponent);
        }

        // POST: odata/SalaryComponents
        public IHttpActionResult Post(SalaryComponent salaryComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SalaryComponents.Add(salaryComponent);
            db.SaveChanges();

            return Created(salaryComponent);
        }

        // PATCH: odata/SalaryComponents(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<SalaryComponent> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SalaryComponent salaryComponent = db.SalaryComponents.Find(key);
            if (salaryComponent == null)
            {
                return NotFound();
            }

            patch.Patch(salaryComponent);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryComponentExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(salaryComponent);
        }

        // DELETE: odata/SalaryComponents(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            SalaryComponent salaryComponent = db.SalaryComponents.Find(key);
            if (salaryComponent == null)
            {
                return NotFound();
            }

            db.SalaryComponents.Remove(salaryComponent);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/SalaryComponents(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponents.Where(m => m.SalaryComponentID == key).Select(m => m.User));
        }

        // GET: odata/SalaryComponents(5)/SalaryComponentAmounts
        [EnableQuery]
        public IQueryable<SalaryComponentAmount> GetSalaryComponentAmounts([FromODataUri] int key)
        {
            return db.SalaryComponents.Where(m => m.SalaryComponentID == key).SelectMany(m => m.SalaryComponentAmounts);
        }

        // GET: odata/SalaryComponents(5)/User1
        [EnableQuery]
        public SingleResult<User> GetUser1([FromODataUri] int key)
        {
            return SingleResult.Create(db.SalaryComponents.Where(m => m.SalaryComponentID == key).Select(m => m.User1));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SalaryComponentExists(int key)
        {
            return db.SalaryComponents.Count(e => e.SalaryComponentID == key) > 0;
        }
    }
}
