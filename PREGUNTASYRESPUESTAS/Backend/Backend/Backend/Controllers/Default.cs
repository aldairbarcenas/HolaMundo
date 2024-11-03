using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Properties.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Default : ControllerBase
    {
        // GET: api/<Default>
        [HttpGet]
        public string Get()
        {
            return "Aplicacion corriendo..";
        }

       
    }
}
