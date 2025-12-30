using Microsoft.AspNetCore.Mvc;

namespace OrganizedLife.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow,
            service = "OrganizedLife API"
        });
    }
}
