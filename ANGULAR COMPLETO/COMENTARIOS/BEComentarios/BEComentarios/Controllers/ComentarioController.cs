using BEComentarios.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BEComentarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : ControllerBase
    {
        private readonly AplicationDbContext _Context;
        public ComentarioController(AplicationDbContext context) { 
            _Context = context;
        }
        // GET: api/<ComentarioController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listComentarios = await _Context.Comentarios.ToListAsync();
                return Ok(listComentarios);

            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        // GET api/<ComentarioController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var comentarios = await _Context.Comentarios.FindAsync(id);
                if (comentarios == null)
                {
                    return NotFound();
                }
                return Ok(comentarios);

            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        // POST api/<ComentarioController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Comentario comentario)
        {
            try
            {
                _Context.Add(comentario);
                await _Context.SaveChangesAsync();
                return Ok(comentario);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // PUT api/<ComentarioController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Comentario comentario)
        {
            try
            {
                if(id != comentario.Id)
                {
                    return BadRequest();
                }

                _Context.Update(comentario);
                await _Context.SaveChangesAsync();
                return Ok(new {message="comentario actualizado con exito!"});
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // DELETE api/<ComentarioController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var comentario= await _Context.Comentarios.FindAsync(id);

                if (comentario == null )
                {
                    return NotFound();
                }

                _Context.Comentarios.Remove(comentario);
                await _Context.SaveChangesAsync();
                return Ok(new { message = "comentario eliminado con exito!" });
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
