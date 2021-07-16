using System;
using System.Collections.Generic;
using System.Text;

namespace WebApp.Models.ApiResult
{
    public class ApiSuccessResult : ApiResult
    {
        public object Data { get; set; }
        public ApiSuccessResult()
        {
            IsSuccessed = true;
        }
        public ApiSuccessResult(object data)
        {
            IsSuccessed = true;
            Data = data;
        }
    }
}
