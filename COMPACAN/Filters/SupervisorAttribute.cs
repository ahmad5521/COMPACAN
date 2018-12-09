using COMPACAN.Models;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace COMPACAN.Filters
{
    public class SupervisorAttribute : System.Web.Mvc.ActionFilterAttribute
    {
        //public override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    HttpContext context = HttpContext.Current;

        //    if (((Employee)context.Session["emp"]).userID_FK != 63012460)
        //    {
        //        //FormsAuthentication.SignOut();
        //        //context.Session.Clear();
        //        string redirectTo = "~/ServerError";
        //        filterContext.Result = new RedirectResult(redirectTo);
        //        return;                
        //    }

        //    base.OnActionExecuting(filterContext);
        //}
    }
}