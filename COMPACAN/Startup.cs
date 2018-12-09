using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(COMPACAN.App_Start.Startup))]
namespace COMPACAN.App_Start
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}