namespace BEComentarios.Models
{
    public class Comentario
    {
        public int Id { get; set; }
        public required string titulo { get; set; }

        public required string creador { get; set; }

        public required string texto { get; set; }

        public required DateTime fechaCreacion { get; set; }
    }
}
