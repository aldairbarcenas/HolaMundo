﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Models
{
    public class Cuestionario
    {
        public int Id { get; set; }
        [Required]
        [Column (TypeName ="varchar(100)")]
        public required string Nombre{ get; set; }

        [Required]
        [Column(TypeName = "varchar(150)")]
        public required string Descripcion { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public int Activo { get; set; }
        public int UsuarioId { get; set; }
        public  Usuario Usuario { get; set; }
        public  List<Pregunta> listPreguntas { get; set; }
    }
}
