﻿using Backend.Domain.IServices;
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
    public class CuestionarioController : ControllerBase
    {
        private readonly ICuestionarioService _cuestionarioService;
        public CuestionarioController(ICuestionarioService cuestionarioService)
        {
            _cuestionarioService = cuestionarioService;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody]Cuestionario cuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);
                cuestionario.UsuarioId=idUsuario;
                cuestionario.Activo = 1;
                cuestionario.FechaCreacion=DateTime.Now;
                await _cuestionarioService.CreateCuestionario(cuestionario);
                return Ok(new { message = "Se agrego el cuestionario exitamente" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetListCuestionarioByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCuestionarioByUser()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);

                var listCuestionario = await _cuestionarioService.GetListCuestionarioByUser(idUsuario);
                return Ok(listCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{idCuestionario}")]

        public async Task<IActionResult> Get (int idCuestionario)
        {
            try
            {
                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario); 
                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete (int idCuestionario)
        {
            try
            {

                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.getTokenIdUsuario(identity);


                var cuestionario = await _cuestionarioService.BuscarCuestionario(idCuestionario, idUsuario);
                if(cuestionario == null)
                {
                    return BadRequest(new { message = "NO SE ENCONTRO NINGUN CUESTIONARIO" });
                }

                await _cuestionarioService.EliminarCuestionario(cuestionario);
                return Ok(new {message="EL CUESTIONARIO FUE ELIMINADO CON EXITO"});
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [Route("GetListCuestionarios")]
        [HttpGet]
        public async Task<IActionResult> GetListCuestionarios()
        {
            try
            {
                var listCuestionarios = await _cuestionarioService.GetListCuestionarios();
                return Ok(listCuestionarios);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
