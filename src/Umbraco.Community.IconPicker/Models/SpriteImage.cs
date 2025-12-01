using System.Runtime.Serialization;

namespace Umbraco.Community.IconPicker.Models;

[DataContract(Name = "spriteImage", Namespace = "")]
public class SpriteImage
{
    [DataMember(Name = "name")]
    public string? Name;
    [DataMember(Name = "path")]
    public string? Path;
}