using FBTarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace FBTarjeta
{
    public class AplicationDbContext: DbContext //la clase db context crea una instancia en la bd para almacenar datos etc
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; } //mapear modelo se pasa el modelo <> y luego el nombre de la base de datos 
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options):base(options) //este es el controlador
        {

        }     

    }
}
