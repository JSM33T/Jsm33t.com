using Jsm33t.Shared.ConfigModels;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Jsm33t.Infra.Dapper
{
    public class DapperFactory(FcConfig _config) : IDapperFactory
    {
        public IDbConnection CreateConnection() => 
            new SqlConnection(_config.SqlConfig!.ConnectionString);
    }
}
