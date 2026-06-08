# Introduction 
This repository contains the code for the IconPicker (Umbraco). After installing the package, a new IconPicker datatype is available. This datatype can be used to select svg icons out of an svgsprite placed in wwwroot/svgsprites.

# Example backoffice 
![iconpicker](https://github.com/user-attachments/assets/fccaaa33-c778-4f8d-ab06-35bebe21c84d)

# Example datatype
<img width="1093" height="520" alt="image" src="https://raw.githubusercontent.com/user-attachments/assets/246455ec-6d57-4950-963b-c4aba32398b2" />

# Installation
Installing through command line:

```bash
dotnet add package Umbraco.Community.IconPicker
```

Or package reference: 

```
<PackageReference Include="Umbraco.Community.IconPicker" Version="{version-number}" />
```

# Configuration for V13
After installation, you can enable the IconPicker datatype by using the extension method `AddIconPicker()`. For example, you can do this through a Composer as shown below:

```csharp
using Umbraco.Community.IconPicker.Compose;
using Umbraco.Cms.Core.Composing;

namespace YourApp.Compose;

public class AppComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddIconPicker();
    }
}
```

# Usage
After enabling, add an datatype and select a file. Add the datatype to a document type. Now you should be able to use it.

Example:

**Model.Icon.Name** -> Returns the icon name

**Model.Icon.GetHref()** -> Returns the path to the sprite, including the fragment identifier (e.g. "/icons.svg#icon-name")

**Model.Icon.ToSvgTag()** -> Returns the full SVG markup tag for this icon.

## ToSvgTag() options

`ToSvgTag()` renders a ready-to-use `<svg>` element and accepts a few optional parameters:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `isDecorative` | `bool` | `true` | When `true`, the icon is hidden from assistive technology (`aria-hidden="true" focusable="false"`). Set to `false` for meaningful icons that should be announced. |
| `altText` | `string` | `""` | Accessible label, used only when `isDecorative` is `false` (rendered as `role="img" aria-label="..."`). |
| `cssClass` | `string?` | `null` | One or more space-separated CSS classes applied to the `<svg>` element, so you can size and style the icon. |

All values are HTML-encoded before being rendered.

Examples:

```cshtml
@* Decorative icon (default) *@
@Model.Icon.ToSvgTag()

@* Meaningful icon with an accessible label *@
@Model.Icon.ToSvgTag(isDecorative: false, altText: "Download")

@* Add CSS classes for sizing/styling *@
@Model.Icon.ToSvgTag(cssClass: "icon icon--large")
```

# Changelog

## 17.1.1
- **Security:** `ToSvgTag()` now HTML-encodes the sprite href, `altText` and `cssClass` before rendering, preventing HTML/attribute injection.
- **Added:** optional `cssClass` parameter on `ToSvgTag()` to apply CSS classes to the rendered `<svg>` element.

## 17.1.0
- **Added:** search field in the icon picker modal to filter icons by name.

## 17.0.0
- Initial release for Umbraco 17.