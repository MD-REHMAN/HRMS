using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Api.Models
{
    public class AddLeaveTypeUser
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int PerAnnumLeave { get; set; }
        public bool  IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}