using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ProductsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _dbContext.Products.ToList();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound(); 
            }
            return Ok(product);
        }

        // GET: api/products
        [HttpGet("GetAlldatefilterProducts")]
        public IActionResult GetAlldatefilterProducts(DateTime? startDate , DateTime? endDate )
        {
            IQueryable<Product> query = _dbContext.Products;

            // Filter by start date if provided
            if (startDate.HasValue)
            {
                query = query.Where(p => p.created_date >= startDate);
            }

            // Filter by end date if provided
            if (endDate.HasValue)
            {
                query = query.Where(p => p.created_date <= endDate);
            }

            var products = query.ToList();
            return Ok(products);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return Ok(product);
        }

        //[HttpPut("{id}")]
        //public IActionResult UpdateProduct(int id, Product product)
        //{
        //    if (id != product.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _dbContext.Entry(product).State = EntityState.Modified;
        //    _dbContext.SaveChanges();
        //    return Ok(product);
        //}

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            if (id != updatedProduct.Id)
            {
                return BadRequest();
            }

            var existingProduct = _dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.name = updatedProduct.name;
            existingProduct.detail = updatedProduct.detail;
            existingProduct.picture = updatedProduct.picture;
            existingProduct.price = updatedProduct.price;
            existingProduct.quantity = updatedProduct.quantity;
            existingProduct.total_price = updatedProduct.total_price;
            existingProduct.created_date = updatedProduct.created_date;

            _dbContext.SaveChanges();

            return Ok(existingProduct);
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _dbContext.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
            return Ok(product);
        }
    }


}
