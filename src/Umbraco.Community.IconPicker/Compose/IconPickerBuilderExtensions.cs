using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.IconPicker.NotificationHandlers.ServerVariablesParsingNotifications;

namespace Umbraco.Community.IconPicker.Compose;

public static class IconPickerBuilderExtensions
{
    public static IUmbracoBuilder AddIconPicker(this IUmbracoBuilder builder)
        => AddInternal(builder);

    private static IUmbracoBuilder AddInternal(this IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingNotificationHandler>();

        return builder;
    }
}
