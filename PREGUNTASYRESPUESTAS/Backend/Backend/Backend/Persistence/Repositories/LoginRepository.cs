using Backend.Domain.IRepositories;
using Backend.Domain.Models;
using Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repositories
{
    public class LoginRepository: ILoginRepository
    {
        private readonly ApplicationDbContext _context;
        public LoginRepository(ApplicationDbContext context)
        {

            _context = context;

        }

        public async Task<Usuario> ValidateUser(Usuario usuario)
        {
            var user = await _context.Usuarios.Where( x=> x.NombreUsuario==usuario.NombreUsuario 
            && x.Password==usuario.Password).FirstOrDefaultAsync();



            return user;
        }
    }
}
