using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pregunta> Pregunta { get; set; }
        public DbSet<Cuestionario> Cuestionario { get; set; }
        public DbSet<Respuesta> Respuesta { get; set; }
        public DbSet<RespuestaCuestionario> RespuestaCuestionario { get; set; }
        public DbSet<RespuestaCuestionarioDetalle> RespuestaCuestionarioDetalle { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración para RespuestaCuestionarioDetalle
            modelBuilder.Entity<RespuestaCuestionarioDetalle>()
                .HasKey(r => r.Id); // Definir la clave primaria

            modelBuilder.Entity<RespuestaCuestionarioDetalle>()
                .HasOne(r => r.RespuestaCuestionario)
                .WithMany(c => c.ListRtaCuestionarioDetalle) // Relación inversa
                .HasForeignKey(r => r.RespuestaCuestionarioId)
                .OnDelete(DeleteBehavior.Restrict); // Comportamiento en eliminación

            modelBuilder.Entity<RespuestaCuestionarioDetalle>()
                .HasOne(r => r.Respuesta)
                .WithMany() // Sin navegación inversa en Respuesta
                .HasForeignKey(r => r.RespuestaId)
                .OnDelete(DeleteBehavior.Restrict); // Comportamiento en eliminación

            // Puedes agregar más configuraciones aquí si es necesario

            base.OnModelCreating(modelBuilder); // Llama al método base
        }
    }
}
