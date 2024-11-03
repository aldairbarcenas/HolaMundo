using AppNetRazor.Datos;
using AppNetRazor.Modelos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppNetRazor.Pages.Cursos
{
    public class EditarModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public EditarModel(ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Curso Curso { get; set; }
        [TempData]
        public string Mensaje { get; set; }
        public async Task OnGet(int id)
        {
            Curso = await _context.Cursos.FindAsync(id); ;
        }

        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                var CursoDesdeBd = await _context.Cursos.FindAsync(Curso.Id);
                CursoDesdeBd.NombreCurso = Curso.NombreCurso;
                CursoDesdeBd.CantidadClases = Curso.CantidadClases;
                CursoDesdeBd.Precio = Curso.Precio;

                await _context.SaveChangesAsync();
                Mensaje = "Curso editado correctamente";
                return RedirectToPage("Index");
            }     
           
            return RedirectToPage();
        }
    }
}
