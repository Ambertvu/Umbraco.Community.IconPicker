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

    [HttpGet("icons")]
    public async Task<IActionResult> GetIcons([FromQuery] string spritePath)
    {
        try
        {
            var fileInfo = _webHostEnvironment.WebRootFileProvider.GetFileInfo(spritePath);

            if (!fileInfo.Exists)
            {
                return NotFound($"Sprite file not found at path: {spritePath}");
            }

            string svgContent;
            using (var stream = fileInfo.CreateReadStream())
            using (var reader = new StreamReader(stream))
            {
                svgContent = await reader.ReadToEndAsync();
            }

            var doc = XDocument.Parse(svgContent);

            var iconIds = doc.Root?
                .Descendants()
                .Where(e => e.Name.LocalName == "symbol")
                .Select(e => e.Attribute("id")?.Value)
                .Where(id => !string.IsNullOrWhiteSpace(id))
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