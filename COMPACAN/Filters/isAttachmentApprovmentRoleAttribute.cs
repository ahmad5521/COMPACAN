using COMPACAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace COMPACAN.Filters
{
    public class isAttachmentApprovmentRoleAttribute : System.Web.Mvc.ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext context = HttpContext.Current;

            if (context.Session["isAttachmentApprovmentRole"].ToString() != "1")
            {
                //FormsAuthentication.SignOut();
                //context.Session.Clear();
                string redirectTo = "~/ServerError";
                filterContext.Result = new RedirectResult(redirectTo);
                return;
            }

            base.OnActionExecuting(filterContext);
        }
    }
}