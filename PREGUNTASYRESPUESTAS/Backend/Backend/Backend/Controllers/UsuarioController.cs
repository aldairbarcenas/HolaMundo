using Backend.Domain.IServices;
using Backend.Domain.Models;
using Backend.DTO;
using Backend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Properties.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioservice)
        {
            _usuarioService = usuarioservice;
        }
        [HttpPost]
        //crear usuario
        public async Task<IActionResult> Post([FromBody]Usuario usuario)
        {
            try
            {
                var validateExistence= await _usuarioService.ValidateUser(usuario);
                if (validateExistence)
                {
                    return BadRequest( new {mensaje="El Usuario "+usuario.NombreUsuario+" ya existe!!"});
                }
                usuario.Password =Encriptar.EncriptarPassword(usuario.Password);
                await _usuarioService.SaveUser(usuario);
                return Ok(new {message="Usuario registrado con exito!!"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("CambiarPassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<IActionResult> CambiarPassword([FromBody] CambiarPasswordDTO cambiarPassword )
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);
                string passwordEncriptado = Encriptar.EncriptarPassword(cambiarPassword.passwordAnterior);
                var usuario = await _usuarioService.ValidatePassword(idUsuario, passwordEncriptado);
                if (usuario == null)
                {
                    return BadRequest(new {mensaje="La Password es INCORRECTA"});
                }
                else
                {
                    
                    usuario.Password = Encriptar.EncriptarPassword(cambiarPassword.nuevaPassword);
                    await _usuarioService.UpdatePassword(usuario);
                    return Ok(new { mensaje = "Contrañeña actualizada!!" });
                }
                
            }
            catch ( Exception ex )
            {
                return BadRequest(ex.Message);
            }
            

            
        }


    }
}
