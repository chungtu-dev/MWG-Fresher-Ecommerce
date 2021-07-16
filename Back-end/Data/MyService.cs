using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class MyService<T>
    {
        private string _jsonDataPath;

        protected MyService(string JsonFileName)
        {
            string RootPath = @"../Data/JSONData/";
            _jsonDataPath = RootPath + JsonFileName;
        }

        protected async Task<List<T>> ReadData()
        {
            try
            {
                var JSON = await File.ReadAllTextAsync(_jsonDataPath);
                return JsonConvert.DeserializeObject<List<T>>(JSON);
            }
            catch
            {
                return null;
            }
        }

        protected async Task<bool> WriteData(List<T> data)
        {
            try
            {
                var JsonData = JsonConvert.SerializeObject(data);
                await File.WriteAllTextAsync(_jsonDataPath, JsonData);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
