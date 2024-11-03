using Backend.Domain.IRepositories;
using Backend.Domain.IServices;
using Backend.Domain.Models;

namespace Backend.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;
        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _repository = usuarioRepository;
        }
        public async Task SaveUser(Usuario usuario)
        {
            await _repository.SaveUser(usuario);
        }

        public async Task<bool> ValidateUser(Usuario usuario)
        {
            return await _repository.ValidateUser(usuario);
        }

        public async Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior)
        {
            return await _repository.ValidatePassword(idUsuario, passwordAnterior);
        }

        public async Task UpdatePassword(Usuario usuario)
        {
            await _repository.UpdatePassword(usuario);

        }
    }
}
