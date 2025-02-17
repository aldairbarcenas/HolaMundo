﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Models
{
    public class Pregunta
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="varchar(100)")]
        public required string Descripcion { get; set; }
        public int CuestionarioId { get; set; }
        public  Cuestionario Cuestionario { get; set; }
        public  List<Respuesta> listRespuesta { get; set; }
    }
}
