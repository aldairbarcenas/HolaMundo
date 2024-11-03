using Backend.Domain.IRepositories;
using Backend.Domain.Models;
using Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ApplicationDbContext _context;
        public UsuarioRepository(ApplicationDbContext context)
        {
            _context=context;
        }
        public async Task SaveUser(Usuario usuario)
        {
            _context.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ValidateUser (Usuario usuario)
        {
            //usamos el contexto, accedemos a la tabla Usuarios
            //usamos el any a ver s iexiste en la tabla usuario el nombre ususario, al que estamos intentando mandar
            var validateExistence = await _context.Usuarios.AnyAsync(x=> x.NombreUsuario==usuario.NombreUsuario);
            return validateExistence;
        }

        public async Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior)
        {
            var usuario = await _context.Usuarios.Where(x=> x.Id==idUsuario && x.Password==passwordAnterior).FirstOrDefaultAsync();
            return usuario;
        }
        public async Task UpdatePassword(Usuario usuario)
        {
            _context.Update(usuario);
            await _context.SaveChangesAsync();
        }
    }
}
