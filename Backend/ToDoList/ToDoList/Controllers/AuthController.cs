using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Unicode;
using ToDoList.DTO;
using ToDoList.Entity;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public static User User=new User();
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User.Username = request.Username;
            User.PasswordHash = passwordHash;
            User.PasswordSalt = passwordSalt;
            return Ok(User);

        }
        private void CreatePasswordHash(string password,out byte[] passwordHash,out byte[] passwordSalt)
        {
            using (var hmac =new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            if (User.Username != request.Username)
            {
                return BadRequest("User not found.");
            }
            if (!VerifyPasswordHash(request.Password,User.PasswordHash,User.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }
            string token = CreateToken(User);
            return Ok(token);
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                 new Claim(ClaimTypes.Name, user.Username)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1), signingCredentials: creds);
            var jwt=new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        private bool VerifyPasswordHash(string password,byte[] passwordHash, byte[] passwordSalt) {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        
        }
    }
}
