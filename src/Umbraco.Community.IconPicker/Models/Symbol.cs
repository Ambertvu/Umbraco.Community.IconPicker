using System.Runtime.Serialization;

namespace Umbraco.Community.IconPicker.Models;

[DataContract(Name = "symbol", Namespace = "")]
public class Symbol
{
    [DataMember(Name = "name")]
    public required string Name;
    [DataMember(Name = "niceName")]
    public required string NiceName;
    [DataMember(Name = "path")]
    public required string Path;
}