using Backend.Domain.IRepositories;
using Backend.Domain.IServices;
using Backend.Persistence.Context;
using Backend.Persistence.Repositories;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();

// Configurar DbContext con SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar el repositorio como Scoped
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<ICuestionarioRepository, CuestionarioRepository>();
builder.Services.AddScoped<IRespuestaCuestionarioRepository, RespuestaCuestionarioRepository>();

//servicios
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ICuestionarioService, CuestionarioService>();
builder.Services.AddScoped<IRespuestaCuestionarioService, RespuestaCuestionarioServicecs >();

builder.Services
    .AddControllers()
    .AddNewtonsoftJson(options =>
    {
        // Manejo de referencias circulares
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore; // O usar ReferenceLoopHandling.Error según sea necesario
    });

// Configuración de JWT en Services
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mi API", Version = "v1" });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configuración de CORS
app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

// Configurar el middleware de Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API v1"));
}

// Configurar el pipeline de solicitudes
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

// Mapeo de controladores
app.MapControllers();

// (Opcional) Mapeo de Razor Pages, si lo necesitas
app.MapRazorPages();

app.Run();
