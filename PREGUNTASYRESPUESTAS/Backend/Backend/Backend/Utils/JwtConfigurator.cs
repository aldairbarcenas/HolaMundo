using Backend.Domain.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Utils
{
    public class JwtConfigurator
    {
        public static string GetToken(Usuario userInfo, IConfiguration config)
        {
            string secretKey = config["Jwt:Key"];
            string Issuer= config["Jwt:Issuer"];
            string Audience = config["Jwt:Audience"];

            // Crear la clave de seguridad simétrica
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Definir los claims (información sobre el usuario)
            var claims = new[]
            {
             new Claim(JwtRegisteredClaimNames.Sub, userInfo.NombreUsuario),
             new Claim("idUsuario", userInfo.Id.ToString()) 
             
             };

            // Crear el token
            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),  // El token expira en 30 minutos
                signingCredentials: credentials);

            // Devolver el token en formato string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public static int getTokenIdUsuario(ClaimsIdentity identity)
        {
            if(identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;

                foreach (var item in claims)
                {
                   // Console.WriteLine($"Claim Type: {item.Type}, Claim Value: {item.Value}");
                    if (item.Type == "idUsuario")
                    {
                        return int.Parse(item.Value);
                    }
                }
            }
            return 0;
        }
    }
}
