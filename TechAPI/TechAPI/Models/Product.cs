namespace TechAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string detail { get; set; }
        public string picture { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        public decimal total_price { get; set; }

        public DateTime created_date { get; set; }

    }

    
}
