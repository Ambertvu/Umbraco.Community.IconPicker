using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.PropertyEditors.IconPicker;

public class IconPickerPropertyValueConverter(ILogger<IconPickerPropertyValueConverter> logger) : IPropertyValueConverter
{
    public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object? inter, bool preview)
    {
        ArgumentNullException.ThrowIfNull(inter);
        try
        {
            return (SpriteImage)inter;
        }
        catch(Exception ex)
        {
            logger.LogError(ex, "Something went wrong trying to convert SpriteImage in ConvertIntermediateToObject");
            return new SpriteImage();
        }
    }

    public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object? inter, bool preview)
    {
        return string.Empty;
    }

    public object? ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source, bool preview)
    {
        if (source == null)
        {
            return new SpriteImage();
        }

        try
        {
            var sourceString = source.ToString() ?? string.Empty;
            return JsonConvert.DeserializeObject<SpriteImage>(sourceString);
        }
        catch(Exception ex)
        {
            logger.LogError(ex, "Something went wrong trying to convert Json to SpriteImage in ConvertSourceToIntermediate");
            return new SpriteImage();
        }
    }

    public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType)
    {
        return PropertyCacheLevel.Element;
    }

    public Type GetPropertyValueType(IPublishedPropertyType propertyType)
    {
        return typeof(SpriteImage);
    }

    public bool IsConverter(IPublishedPropertyType propertyType)
    {
        return propertyType.EditorAlias.Equals(PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerAlias);
    }

    public bool? IsValue(object? value, PropertyValueLevel level)
    {
        return false;
    }
}
