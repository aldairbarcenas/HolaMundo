using Backend.Domain.IServices;
using Backend.Domain.Models;
using Backend.Services;
using Backend.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Properties.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IConfiguration _config;
        public LoginController(ILoginService loginservice, IConfiguration config)
        {
            _loginService = loginservice;
            _config = config;

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                usuario.Password=Encriptar.EncriptarPassword(usuario.Password);
                var user= await _loginService.ValidateUser(usuario);
                if (user == null)
                {
                    return BadRequest(new {mensaje="Usuario o contraseña invalidos!!"});
                }
                else
                {
                    string tokenString = JwtConfigurator.GetToken(user, _config);
                    return Ok(new { token = tokenString });

                }


               
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
