using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;

namespace Umbraco.Community.IconPicker.Controllers;

[VersionedApiBackOfficeRoute("iconpicker")]
[ApiExplorerSettings(GroupName = "IconPicker")]
public class IconPickerController : ManagementApiControllerBase
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public IconPickerController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet("sprites")]
    public IActionResult GetSprites()
    {
        var spritesPath = Path.Combine(_webHostEnvironment.WebRootPath, "svgsprites");
        if (!Directory.Exists(spritesPath))
        {
            return Ok(Array.Empty<object>());
        }

        var svgFiles = Directory.EnumerateFiles(spritesPath, "*.svg")
            .Select(path => new
            {
                name = Path.GetFileNameWithoutExtension(path),
                path = "/" + Path.GetRelativePath(_webHostEnvironment.WebRootPath, path).Replace("\\", "/")
            })
            .ToList();

        return Ok(svgFiles);
    }

    [HttpGet("icons")]
    public async Task<IActionResult> GetIcons([FromQuery] string spritePath)
    {
        try
        {
            var fullPath = Path.Combine(_webHostEnvironment.WebRootPath, spritePath.TrimStart('/'));
            if (!System.IO.File.Exists(fullPath))
            {
                return NotFound($"Sprite file not found at path: {spritePath}");
            }

            var svgContent = await System.IO.File.ReadAllTextAsync(fullPath);
            var doc = XDocument.Parse(svgContent);

            var iconIds = doc.Root?
                .Descendants()
                .Where(e => e.Name.LocalName == "symbol")
                .Select(e => e.Attribute("id")?.Value)
                .Where(id => !string.IsNullOrEmpty(id))
                .ToList();

            if (iconIds == null || iconIds.Count == 0)
            {
                return NotFound("No icons found in the sprite file");
            }

            return Ok(iconIds);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error processing sprite file: {ex.Message}");
        }
    }
}