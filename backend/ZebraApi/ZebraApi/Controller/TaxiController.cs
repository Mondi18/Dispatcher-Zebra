using Microsoft.AspNetCore.Mvc;
using ZebraApi.Interfaces;
using ZebraApi.Model;
using Microsoft.Extensions.Logging;
namespace ZebraApi.Controller
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController, Route("/taxi")]
    public class TaxiController : ControllerBase
    {
        private readonly ILogger<TaxiController> _logger;
        private readonly ITaxiRepository _taxiRepository;

        public TaxiController(ILogger<TaxiController> logger, ITaxiRepository taxiRepository)
        {
            _logger = logger;
            _taxiRepository = taxiRepository;
        }

        [HttpGet("GetAllTaxies")]
        public async Task<ActionResult<List<Taxi>>> GetAllProducts()
        {
            return Ok(await _taxiRepository.GetAll());
        }
        [HttpGet("GetTaxiById")]
        public async Task<ActionResult<Taxi>> GetTaxiById(int id)
        {
            var taxi = await _taxiRepository.GetById(id);
            if (taxi == null)
            {
                _logger.LogError($"No taxi found in database with id {id}");
                return NotFound("No taxi found in database with id {id}");
            }
            else
            {
                _logger.LogInformation($"The current taxi on id :{id}");
                return Ok(taxi);
            }
        }

        [HttpPut("AddTaxi")]
        public async Task<IActionResult> AddTaxi([FromBody] List<Taxi> taxies)
        {
            var success = false;
            foreach (var taxi in taxies)
            {
                success = await _taxiRepository.Update(taxi);
            }
            return success ? Ok(success) : BadRequest();

            //if (success)
            //{
            //    _logger.LogInformation($"Successfully created or updated taxi with ID: {taxi.Id}");
            //    return CreatedAtAction(nameof(AddTaxi), new { id = taxi.Id }, taxi);
            //}

            //_logger.LogError($"Failed to add or update taxi with ID: {taxi.Id}");
            //return BadRequest("Failed to add or update taxi."); 
        }

    }

}
