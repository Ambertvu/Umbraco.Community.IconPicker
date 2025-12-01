using Microsoft.AspNetCore.Routing;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.IconPicker.Controllers;
using Umbraco.Extensions;

namespace Umbraco.Community.IconPicker.NotificationHandlers.ServerVariablesParsingNotifications;

public class ServerVariablesParsingNotificationHandler(LinkGenerator linkGenerator)
    : INotificationHandler<ServerVariablesParsingNotification>
{
    public void Handle(ServerVariablesParsingNotification notification)
    {
        notification.ServerVariables.Add(PackageConstants.PropertyEditors.IconPicker.DataEditor.ServerVariableName, new Dictionary<string, object?>
        {
            {
                PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerName, linkGenerator.GetUmbracoApiServiceBaseUrl<IconPickerController>(controller => controller.GetFolders())
            }
        });
    }
}