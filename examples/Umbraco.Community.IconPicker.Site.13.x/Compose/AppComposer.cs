using Umbraco.Community.IconPicker.Compose;
using Umbraco.Cms.Core.Composing;

namespace Umbraco.Community.IconPicker.Site.Compose;

public class AppComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddIconPicker();
    }
}
