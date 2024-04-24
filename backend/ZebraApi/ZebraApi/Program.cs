using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ZebraApi.DbContext;
using ZebraApi.Repositories;
using ZebraApi.Interfaces;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Database configuration
var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DefaultConnection")
                       ?? throw new InvalidOperationException("Connection string not found.");

builder.Services.AddDbContext<TaxiDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});
// Register repositories
builder.Services.AddScoped<ITaxiRepository, TaxiRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseSwagger();
app.UseCors(options => options
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});
app.Run();