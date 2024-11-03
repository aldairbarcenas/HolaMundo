using Backend.Domain.Models;

namespace Backend.Domain.IServices
{
    public interface ICuestionarioService
    {
        Task CreateCuestionario(Cuestionario cuestionario);
        Task<List<Cuestionario>> GetListCuestionarioByUser(int idUsuario);

        Task<Cuestionario> GetCuestionario(int idCuestionario);

        Task<Cuestionario> BuscarCuestionario(int idCuestionario, int idUsuario);

        Task EliminarCuestionario(Cuestionario cuestionario);

        Task<List<Cuestionario>> GetListCuestionarios();

    }
}
