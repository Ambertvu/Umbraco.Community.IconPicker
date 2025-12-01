using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.PropertyEditors.IconPicker;

public class IconPickerConfiguration
{
    [ConfigurationField("svgSprite", "Select sprite", PackageConstants.PropertyEditors.IconPicker.DataEditor.SpriteDropdownView, Description = "Upload a valid sprite in subfolder in wwwroot, only folders containing an svg will be shown")]
    public SpriteConfiguration? Sprite { get; set; }
}