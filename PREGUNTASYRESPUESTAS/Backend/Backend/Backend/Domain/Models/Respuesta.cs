using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Models
{
    public class Respuesta
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public required string Descripcion { get; set; }
        [Required]
        public required bool EsCorrecta { get; set; }
        public int PreguntaId { get; set; }
        public  Pregunta Pregunta { get; set; }
    }
}
