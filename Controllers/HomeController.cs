using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OCHMSAP_UserModule_1.Data;
using OCHMSAP_UserModule_1.Models;

namespace OCHMSAP_UserModule_1.Controllers
{
    public class HomeController : Controller
    {       
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Stresses()
        {
            return View();
        }

        public IActionResult Page(string cat1,string cat2,string cat3)
        {
            Tuple<string, string, string> cat_Tupple = new Tuple<string, string, string>(
                item1:cat1,
                item2:cat2,
                item3:cat3
                );
            return View(cat_Tupple);
        }
        public IActionResult Map()
        {
            return View();
        }
        [Authorize (Roles = RoleNames.StressAffectee)]
        public IActionResult SolveMyStress()
        {            
            return View();
        }

        [Authorize(Roles = RoleNames.Volunteer)]
        public IActionResult FindStressSolver()
        {
            return View();
        }
        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
