using Newtonsoft.Json;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Community.IconPicker.Models;

namespace Umbraco.Community.IconPicker.PropertyValueConverters;

public class IconPickerValueConverter : IPropertyValueConverter
{
    public bool IsConverter(IPublishedPropertyType propertyType)
    {
        return propertyType.EditorUiAlias.Equals(PackageConstants.PropertyEditors.IconPicker.IconPickerName);
    }

    public bool? IsValue(object? value, PropertyValueLevel level)
    {
        return value?.ToString() is not null;
    }

    public Type GetPropertyValueType(IPublishedPropertyType propertyType)
    {
        return typeof(SpriteImage);
    }

    public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType)
    {
        return PropertyCacheLevel.Element;
    }

    public object? ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source,
        bool preview)
    {
        // Convert the stored JSON string to intermediate form
        if (source == null) return null;

        // If it's already a SpriteImage, return it
        if (source is SpriteImage spriteImage) return spriteImage;

        // Try to deserialize the JSON string
        if (source.ToString() is { } json)
        {
            try
            {
                return JsonConvert.DeserializeObject<SpriteImage>(json);
            }
            catch
            {
                return null;
            }
        }

        return null;

    }

    public object? ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType,
        PropertyCacheLevel referenceCacheLevel, object? inter, bool preview)
    {
        // Convert from intermediate to final object
        if (inter == null) return null;

        // If it's already a SpriteImage, return it
        if (inter is SpriteImage spriteImage) return spriteImage;

        // If it's a string, try to deserialize it
        if (inter.ToString() is { } json)
        {
            try
            {
                return JsonConvert.DeserializeObject<SpriteImage>(json);
            }
            catch
            {
                return null;
            }
        }

        return null;

    }
}