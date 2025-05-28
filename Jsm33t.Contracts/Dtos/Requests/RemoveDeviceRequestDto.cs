namespace Jsm33t.Contracts.Dtos.Requests
{
    public class RemoveDeviceRequestDto
    {
        public Guid? DeviceId { get; set; }
        public bool DeleteAll { get; set; } = false;
    }
}
