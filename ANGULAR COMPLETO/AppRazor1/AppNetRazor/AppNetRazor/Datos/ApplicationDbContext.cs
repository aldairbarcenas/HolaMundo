using AppNetRazor.Modelos;
using Microsoft.EntityFrameworkCore;


namespace AppNetRazor.Datos
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }

        public DbSet<Curso> Cursos { get; set; }
    }
}
