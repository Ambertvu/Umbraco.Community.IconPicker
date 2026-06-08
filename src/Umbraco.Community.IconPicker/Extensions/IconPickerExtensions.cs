using System.Text;
using System.Text.Encodings.Web;
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
    /// <param name="icon">The sprite image to render.</param>
    /// <param name="isDecorative">When <c>true</c>, the icon is hidden from assistive technology; otherwise it is exposed as an image with <paramref name="altText"/> as its label.</param>
    /// <param name="altText">The accessible label, used only when <paramref name="isDecorative"/> is <c>false</c>.</param>
    /// <param name="cssClass">An optional CSS class (or space-separated classes) to apply to the <c>&lt;svg&gt;</c> element.</param>
    public static HtmlString ToSvgTag(this SpriteImage icon, bool isDecorative = true, string altText = "", string? cssClass = null)
    {
        var enc = HtmlEncoder.Default;
        var href = enc.Encode(icon.GetHref());

        var attributes = new StringBuilder();
        if (!string.IsNullOrWhiteSpace(cssClass))
        {
            attributes.Append($"class=\"{enc.Encode(cssClass)}\" ");
        }

        if (isDecorative)
        {
            attributes.Append("aria-hidden=\"true\" focusable=\"false\"");
        }
        else
        {
            attributes.Append("role=\"img\"");
            if (!string.IsNullOrWhiteSpace(altText))
            {
                attributes.Append($" aria-label=\"{enc.Encode(altText)}\"");
            }
        }

        return new HtmlString($"<svg {attributes}><use href=\"{href}\"></use></svg>");
    }
}