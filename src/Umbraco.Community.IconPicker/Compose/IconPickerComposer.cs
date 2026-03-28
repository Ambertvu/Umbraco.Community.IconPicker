using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.IconPicker.Controllers;

namespace Umbraco.Community.IconPicker.Compose;

public class IconPickerComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddControllers()
            .AddApplicationPart(typeof(IconPickerController).Assembly);
    }
}