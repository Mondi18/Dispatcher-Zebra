namespace ZebraApi.Model
{
    public class Taxi
    {
        public int? Id { get;  set; }
        public string? DriverName { get;  set; }
        public string? LicenseNumber { get;  set; }
        public double? Lat { get; set; }
        public double? Long { get; set; }
        public bool? IsAvailable { get; set; }

        public Taxi()
        {

        }
    }
}
