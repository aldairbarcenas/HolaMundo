﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Models
{
    public class RespuestaCuestionario
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(100)")]
        public required string NombreParticipante { get; set; }

        public DateTime Fecha { get; set; }

        public int Activo { get; set; }
        public int CuestionarioId { get; set; }

        public Cuestionario Cuestionario { get; set; }

        public List<RespuestaCuestionarioDetalle> ListRtaCuestionarioDetalle { get; set; }
    }
}
