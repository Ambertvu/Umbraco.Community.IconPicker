using Microsoft.Extensions.DependencyInjection;
using Umbraco.Community.IconPicker.Controllers;

namespace Umbraco.Community.IconPicker.Compose;

public static class StartupExtensions
{
    public static IServiceCollection AddIconPicker(this IServiceCollection services)
    {
        services.AddControllers()
            .AddApplicationPart(typeof(IconPickerController).Assembly);

        return services;
    }
}