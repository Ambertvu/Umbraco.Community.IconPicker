using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Html;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Community.IconPicker.Common;
using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.Controllers;

public class IconPickerController(IWebHostEnvironment hostingEnvironment) : UmbracoAuthorizedApiController
{
    private readonly string _webRootPath = hostingEnvironment.WebRootPath;

    public ApiAttempt<List<string>> GetFolders()
    {
        if(!Directory.Exists(_webRootPath))
        {
            return ApiAttempt<List<string>>.Failed($"No directory found {_webRootPath}");
        }

        var folders = GetDirectoriesContainingSvgFiles(_webRootPath);
        if (folders.Any())
        {
            return ApiAttempt<List<string>>.Success(folders);
        }

        return ApiAttempt<List<string>>.Failed("No folders found containing SVG sprites in the wwwroot folder");
    }

    public ApiAttempt<List<Symbol>> GetSprites(string path)
    {
        var fullPath = Path.Join(_webRootPath, path);
        if (!Directory.Exists(fullPath))
        {
            return ApiAttempt<List<Symbol>>.Failed($"No directory found {path}");
        }

        var svgFiles = GetSvgFiles(fullPath);

        if (svgFiles.Count == 0)
        {
            return ApiAttempt<List<Symbol>>.Failed("No files found in directory");
        }

        var sprites = svgFiles.Select(GetSprite).OfType<Symbol>().ToList();

        if (sprites.Any())
        {
            return ApiAttempt<List<Symbol>>.Success(sprites);
        }
        return ApiAttempt<List<Symbol>>.Failed("No sprites found!");
    }

    public ApiAttempt<List<SpriteImage>> GetImagesFromSprite(string path)
    {
        var fullPath = Path.Join(_webRootPath, path);

        var file = GetSprite(fullPath);
        if (file == null)
        {
            return ApiAttempt<List<SpriteImage>>.Failed($"Could not find file at path {path}");
        }

        var symbols = XElement.Parse(System.IO.File.ReadAllText(fullPath)).Elements();
        var imageList = symbols.Where(x => x.Name.LocalName == PackageConstants.PropertyEditors.IconPicker.SvgSymbolName)
            .Select(symbol => new SpriteImage
            {
                Name = symbol.Attribute("id")?.Value,
                Path = "/" + path
            }).ToList();

        return ApiAttempt<List<SpriteImage>>.Success(imageList);
    }

    private Symbol? GetSprite(string path)
    {
        if (!Path.IsPathRooted(path))
        {
            return null;
        }
        if (!System.IO.File.Exists(path))
        {
            return null;
        }
        return new Symbol
            {
                Name = Path.GetFileName(path),
                NiceName = Path.GetFileNameWithoutExtension(path),
                Path = Path.GetRelativePath(_webRootPath, path).Replace("\\", "/")
            };
    }

    public ApiAttempt<HtmlString> GetSpriteImageHtml(string name, string path)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(path))
        {
            return ApiAttempt<HtmlString>.Failed("invalid");
        }

        var svg = new HtmlString($"<svg class='icon {name}'><use xlink:href='{path}#{name}'></use></svg>");

        return ApiAttempt<HtmlString>.Success(svg);
    }

    private static List<string> GetDirectoriesContainingSvgFiles(string rootPath)
    {
        return Directory.EnumerateDirectories(rootPath).Where(ContainsSvgFiles)
            .Select(directory => new DirectoryInfo(directory).Name).ToList();
    }

    private static bool ContainsSvgFiles(string path) => GetSvgFiles(path).Any();

    private static List<string> GetSvgFiles(string path)
    {
        return Directory.EnumerateFiles(path).Where(file => Path.GetExtension(file).Equals(PackageConstants.PropertyEditors.IconPicker.SvgExtension, StringComparison.OrdinalIgnoreCase)).ToList();
    }
}
