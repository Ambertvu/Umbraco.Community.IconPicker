using System.Text;
using Microsoft.AspNetCore.Html;
using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.Extensions;

public static class IconPickerExtensions
{
    /// <summary>
    /// Returns the path to the sprite, including the fragment identifier (e.g. "/icons.svg#icon-name").
    /// </summary>
    public static string GetHref(this SpriteImage icon) => $"{icon.Path}#{icon.Name}";

    /// <summary>
    /// Renders this sprite image as an SVG element, including appropriate ARIA attributes
    /// for decorative or assistive (screen-reader) usage.
    /// </summary>
    public static HtmlString ToSvgTag(this SpriteImage icon, bool isDecorative = true, string altText = "") {

        var sb = new StringBuilder();
        if (isDecorative)
        {
            sb.Append("aria-hidden=\"true\" focusable=\"false\"");
        }
        else
        {
            sb.Append("role=\"img\"");
            if (!string.IsNullOrWhiteSpace(altText))
            {
                sb.Append($" aria-label=\"{altText}\"");
            }
        }

        return new HtmlString($"<svg {sb}><use href='{icon.GetHref()}'></use></svg>");
    }
}