using Backend.Domain.IRepositories;
using Backend.Domain.IServices;
using Backend.Domain.Models;

namespace Backend.Services
{
    public class LoginService: ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        public LoginService(ILoginRepository loginRepository)
        {

            _loginRepository = loginRepository;
        }

        public async Task<Usuario> ValidateUser(Usuario usuario)
        {
            return await _loginRepository.ValidateUser(usuario);
        }
    }
}
