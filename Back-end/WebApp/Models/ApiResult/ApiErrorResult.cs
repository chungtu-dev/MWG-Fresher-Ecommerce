using System;
using System.Collections.Generic;
using System.Text;

namespace WebApp.Models.ApiResult
{
    public class ApiErrorResult : ApiResult
    {
        public string[] ValidationErrors { get; set; }

        public ApiErrorResult() { IsSuccessed = false; }

        public ApiErrorResult(string message)
        {
            IsSuccessed = false;
            Message = message;
        }

        public ApiErrorResult(string[] validationErrors)
        {
            IsSuccessed = false;
            ValidationErrors = validationErrors;
        }
    }
}
