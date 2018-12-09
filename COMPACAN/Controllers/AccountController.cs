//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;
//using System.Web;
using System.Web.Mvc;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;
//using Microsoft.Owin.Security;
using COMPACAN.Models;
using System.Web.Security;
using COMPACAN.Filters;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace COMPACAN.Controllers
{

    [NoCache]
    public class AccountController : Controller
    {

        string cs = ConfigurationManager.ConnectionStrings["IdaraConnectionString"].ConnectionString;

        public ActionResult Login()
        {
            return this.View();
        }

        [HttpPost]
        public ActionResult Login(myLoginViewModel model, string returnUrl)
        {
            if (!this.ModelState.IsValid)
            {
                return this.View(model);
            }




            

            this.ModelState.AddModelError(string.Empty, "The user name or password provided is incorrect.");

            return this.View(model);
        }


        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return this.RedirectToAction("Index", "Home");
        }
    }
}