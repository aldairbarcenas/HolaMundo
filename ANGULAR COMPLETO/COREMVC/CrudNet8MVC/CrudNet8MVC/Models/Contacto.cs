using System.ComponentModel.DataAnnotations;

namespace CrudNet8MVC.Models
{
    public class Contacto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage ="El nombre es OBLIGATORIO")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El Telefono es OBLIGATORIO")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "El Celular es OBLIGATORIO")]
        public string Celular { get; set; }

        [Required(ErrorMessage = "El Email es OBLIGATORIO")]
        public string Email { get; set; }
        
        public DateTime FechaCreacion { get; set; }
    }
}
