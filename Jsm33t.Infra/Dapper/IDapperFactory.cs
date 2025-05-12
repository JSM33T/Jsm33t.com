using System.Data;

namespace Jsm33t.Infra.Dapper
{
    public interface IDapperFactory
    {
        IDbConnection CreateConnection();
    }
}
