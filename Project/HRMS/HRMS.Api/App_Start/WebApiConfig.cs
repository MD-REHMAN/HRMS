﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using HRMS.Data;

namespace HRMS.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<User>("Users");
            builder.EntitySet<Role>("Roles");
            builder.EntitySet<CompanyBranch>("CompanyBranches");
            builder.EntitySet<Department>("Departments");
            builder.EntitySet<PaySlip>("PaySlips");
            builder.EntitySet<SalaryComponent>("SalaryComponents");
            builder.EntitySet<SalaryComponentAmount>("SalaryComponentAmounts");
            builder.EntitySet<UserDepartment>("UserDepartments");
            builder.EntitySet<UserRole>("UserRoles");
            builder.EntitySet<LeaveType>("LeaveTypes");
            builder.EntitySet<LeaveRequest>("LeaveRequests");
            builder.EntitySet<UserLeave>("UserLeaves");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

        }
    }
}
