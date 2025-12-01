using System.Runtime.Serialization;

namespace Umbraco.Community.IconPicker.Common;

[DataContract(Name = "attempt", Namespace = "")]
public class ApiAttempt<T> where T : class
{
    [DataMember(Name = "content")]
    public T? Content { get; set; }

    [DataMember(Name = "succeeded")]
    public bool Succeeded { get; set; }

    [DataMember(Name = "errorMessage")]
    public string? ErrorMessage { get; set; }

    public static ApiAttempt<T> Success(T content)
    {
        return new ApiAttempt<T>
        {
            Succeeded = true,
            Content = content,
            ErrorMessage = string.Empty,
        };
    }

    public static ApiAttempt<T> Failed(string errorMessage)
    {
        return new ApiAttempt<T>
        {
            Succeeded = false,
            Content = default,
            ErrorMessage = errorMessage,
        };
    }
}