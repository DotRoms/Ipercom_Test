using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MonProjetAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure the CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        // Permet toutes les origines (domaine, sous-domaine, etc.)
        policy.AllowAnyOrigin()
              // Permet toutes les méthodes HTTP (GET, POST, PUT, DELETE, etc.)
              .AllowAnyMethod()
              // Permet tous les en-têtes HTTP
              .AllowAnyHeader();
    });
});

// Configuration d'Entity Framework pour PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Configuration de l'authentification via JWT (JSON Web Tokens)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Valider l'émetteur du token
            ValidateIssuer = true,
            // Valider le destinataire du token
            ValidateAudience = true,
            // Vérifier la durée de vie du token
            ValidateLifetime = true,
            // Vérifier la clé de signature du token
            ValidateIssuerSigningKey = true,
            // Spécifier l'émetteur valide
            ValidIssuer = "Jwt:Issuer",
            // Spécifier l'audience valide
            ValidAudience = "Jwt:Audience",
            // Clé secrète pour signer les tokens (utilisée pour la vérification)
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Jwt:Key"))
        };
    });

// Configuration de Swagger pour générer la documentation des API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.EnableAnnotations();  // Activer les annotations Swagger
});

// Ajouter le service d'autorisation (permet d'appliquer des règles d'accès aux API)
builder.Services.AddAuthorization();

// Ajouter les contrôleurs pour gérer les requêtes HTTP
builder.Services.AddControllers();

// Construction de l'application à partir de la configuration ci-dessus
var app = builder.Build();

// Utiliser la politique CORS "AllowAll" pour autoriser les requêtes venant de n'importe quelle url
app.UseCors("AllowAll");

// Activer l'authentification JWT pour toutes les requêtes
app.UseAuthentication();

// Activer l'autorisation pour restreindre l'accès aux ressources protégées par des règles d'autorisation
app.UseAuthorization();

// Configuration de Swagger pour le mode développement
if (app.Environment.IsDevelopment())
{
    // Activer Swagger pour générer la documentation de l'API
    app.UseSwagger();
    app.UseSwaggerUI(
        c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
            c.RoutePrefix = string.Empty;
        });

}

// Mapping des contrôleurs pour gérer les endpoints d'API
app.MapControllers();

// Démarrer l'application web
app.Run();
