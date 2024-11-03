using Backend.Domain.IRepositories;
using Backend.Domain.IServices;
using Backend.Domain.Models;
using Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repositories
{
    public class CuestionarioRepository: ICuestionarioRepository
    {
        private readonly ApplicationDbContext _context;
        public CuestionarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateCuestionario(Cuestionario cuestionario)
        {
            _context.Add(cuestionario);
            await _context.SaveChangesAsync();  
        }

        public async Task<List<Cuestionario>> GetListCuestionarioByUser(int idUsuario)
        {
            var ListCuestionario = await  _context.Cuestionario.Where(x => x.Activo ==1 && x.UsuarioId== idUsuario).ToListAsync();
            return ListCuestionario;
        }

        public async Task<Cuestionario> GetCuestionario (int idCuestionario)
        {
            var cuestionario = await _context.Cuestionario.Where(x=> x.Id ==idCuestionario 
            && x.Activo==1).Include(x=> x.listPreguntas).ThenInclude(x=>x.listRespuesta).FirstOrDefaultAsync(); 
            return cuestionario;
        }

        public async Task<Cuestionario> BuscarCuestionario (int IdCuestionario, int idUsuario)
        {
            var cuestionario = await _context.Cuestionario.Where(x=> x.Id ==IdCuestionario && 
            x.Activo==1 && x.UsuarioId==idUsuario).FirstOrDefaultAsync();
            return cuestionario;
        }

        public async Task EliminarCuestionario(Cuestionario cuestionario)
        {
            cuestionario.Activo = 0;
            _context.Entry(cuestionario).State=EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cuestionario>> GetListCuestionarios()
        {
            var listCuestionarios = await _context.Cuestionario.Where(x => x.Activo == 1)
                .Select(o => new Cuestionario 
                {

                    Id = o.Id,
                    Nombre = o.Nombre,
                    Descripcion=o.Descripcion,
                    FechaCreacion=o.FechaCreacion,
                    Usuario= new Usuario { NombreUsuario = o.Usuario.NombreUsuario}
                }).ToListAsync();


            return listCuestionarios;
        }
    }
}
