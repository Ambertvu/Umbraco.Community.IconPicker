using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.Extensions;

public static class IconPickerExtensions
{
    /// <summary>
    /// Returns the path to the sprite, including the fragment identifier (e.g. "/icons.svg#icon-name").
    /// </summary>
    public static string GetHref(this SpriteImage icon) => $"{icon.Path}#{icon.Name}";

    /// <summary>
    /// Returns the full SVG markup tag for this icon.
    /// </summary>
    public static string ToSvgTag(this SpriteImage icon) => $"<svg><use href='{icon.GetHref()}'></use></svg>";
}