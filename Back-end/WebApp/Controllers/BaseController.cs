using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    public class BaseController : Controller
    {
        public T GetDataFromJsonCookie<T>(string key)
        {
            string json = Request.Cookies[key];
            try
            {
                var data = JsonConvert.DeserializeObject<T>(json);
                return data;
            }
            catch
            {
                return default(T);
            }
        }

        public T GetDataFromJsonSession<T>(string key)
        {
            string json = HttpContext.Session.GetString(key);
            try
            {
                var data = JsonConvert.DeserializeObject<T>(json);
                return data;
            }
            catch
            {
                return default(T);
            }
        }

        protected void SetJsonDataCookie(string key, object data)
        {
            var json = JsonConvert.SerializeObject(data);

            Response.Cookies.Append(key, json, new CookieOptions() { SameSite = SameSiteMode.None, Secure = true });
        }

        protected void SetJsonDataSession(string key, object data)
        {
            var json = JsonConvert.SerializeObject(data);
            HttpContext.Session.SetString(key, json);
        }
    }
}
