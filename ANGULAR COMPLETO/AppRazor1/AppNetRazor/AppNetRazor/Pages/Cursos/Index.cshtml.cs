using AppNetRazor.Datos;
using AppNetRazor.Modelos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace AppNetRazor.Pages.Cursos
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        [TempData]
        public string Mensaje { get; set; }

        public IEnumerable<Curso>Cursos { get; set; }
        public async Task OnGet()
        {
            Cursos= await _context.Cursos.ToListAsync();
        }

        public async Task<IActionResult> OnPostBorrar(int id)
        {            
                var curso = await _context.Cursos.FindAsync(id);
                if(curso==null)
                {
                    return NotFound();
                }
                _context.Cursos.Remove(curso);                

                await _context.SaveChangesAsync();
                Mensaje = "Curso borrado correctamente";
                return RedirectToPage("Index");  
        }

    }
}
