using Backend.Domain.IServices;
using Backend.Domain.Models;
using Backend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespuestaCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;
        private readonly ICuestionarioService _cuestionarioService;

        public RespuestaCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService, ICuestionarioService cuestionarioService)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
            _cuestionarioService= cuestionarioService;  

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RespuestaCuestionario respuestaCuestionario)
        {
            try
            {
                await _respuestaCuestionarioService.SaveRespuestaCuestionario(respuestaCuestionario);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {
                //obtenemos idUsuario del token
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);

                var listRespuestaCuestionario = await _respuestaCuestionarioService.
                    ListRespuestaCuestionario(idCuestionario, idUsuario);
                if (listRespuestaCuestionario == null)
                {
                    return BadRequest(new {message="ERROR AL BUSCAR EL LISTADO DE RESPUESTAS"});    
                }

                return Ok(listRespuestaCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                //obtenemos idUsuario del token
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);

                //creamos un metodo para obtener la respuesta al cuestionario

                var respuestaCuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(id, idUsuario);
                if (respuestaCuestionario==null)
                {
                    return BadRequest(new { message = "ERROR AL BUSCAR LA RESPUESTA AL CUESTIONARIO" });
                }

                await _respuestaCuestionarioService.EliminarRespuestaCuestionario(respuestaCuestionario);
                return Ok(new { messafe = "LA RESPUESTA AL CUESTIONARIO FUE ELIMINADA CON EXITO" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetCuestionarioByIdRespuesta/{idRespuesta}")]        
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCuestionarioByIdRespuesta (int idRespuesta)
        {
            try
            {
                //obtener el idCuestionario dado un idRespuesta
                int idCuestionario = await _respuestaCuestionarioService.GetIdCuestionarioByIdRespuesta(idRespuesta);


                //buscamos el cuestionario (ya lo tenemos)
                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);
                //return Ok();
                //buscamos la respuesta seleccionadas dada un idRespuesta
                var listRespuesta = await _respuestaCuestionarioService.GetListRespuestas(idRespuesta);
                return Ok(new {cuestionario=cuestionario, respuestas =listRespuesta});
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


    }
}
