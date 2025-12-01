using System.Runtime.Serialization;

namespace Umbraco.Community.IconPicker.Models;

[DataContract(Name = "spriteConfiguration", Namespace = "")]
public class SpriteConfiguration
{
    [DataMember(Name = "folder")]
    public required string Folder;
    [DataMember(Name = "spriteName")]
    public required string SpriteName;
    [DataMember(Name = "spritePath")]
    public required string SpritePath;
}