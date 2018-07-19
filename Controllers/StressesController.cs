using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OCHMSAP_UserModule_1.Data;
using OCHMSAP_UserModule_1.Models;

namespace OCHMSAP_UserModule_1.Controllers
{
    [Produces("application/json")]
    [Route("api/Stresses")]
    public class StressesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Stresses
        [HttpGet]
        public IEnumerable<Stress> Getstresses()
        {
            return _context.stresses;
        }

        // GET: api/Stresses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStress([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stress = await _context.stresses.SingleOrDefaultAsync(m => m.stress_id == id);

            if (stress == null)
            {
                return NotFound();
            }

            return Ok(stress);
        }

        // PUT: api/Stresses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStress([FromRoute] int id, [FromBody] Stress stress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stress.stress_id)
            {
                return BadRequest();
            }

            _context.Entry(stress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Stresses
        [HttpPost]
        public async Task<IActionResult> PostStress([FromBody] Stress stress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.stresses.Add(stress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStress", new { id = stress.stress_id }, stress);
        }

        // DELETE: api/Stresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStress([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stress = await _context.stresses.SingleOrDefaultAsync(m => m.stress_id == id);
            if (stress == null)
            {
                return NotFound();
            }

            _context.stresses.Remove(stress);
            await _context.SaveChangesAsync();

            return Ok(stress);
        }

        private bool StressExists(int id)
        {
            return _context.stresses.Any(e => e.stress_id == id);
        }
    }
}