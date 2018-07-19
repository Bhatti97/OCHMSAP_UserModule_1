using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OCHMSAP_UserModule_1.Models
{
    public class Stress
    {
        [Key]
        public int stress_id { get; set; }
        public string stress_Name { get; set; }
        public string stress_type { get; set; }
    }
}
