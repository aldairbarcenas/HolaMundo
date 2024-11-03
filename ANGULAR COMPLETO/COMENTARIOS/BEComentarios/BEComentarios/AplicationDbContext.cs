using BEComentarios.Models;
using Microsoft.EntityFrameworkCore;

namespace BEComentarios
{
    public class AplicationDbContext: DbContext
    {
        public DbSet<Comentario> Comentarios { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext>options):base(options)
        {

        }
    }
}
