using Jsm33t.Contracts.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Jsm33t.Api.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class DeductPointsAttribute : Attribute
    {
        public int Points { get; }
        public DeductPointsAttribute(int points)
        {
            Points = points;
        }
    }
}