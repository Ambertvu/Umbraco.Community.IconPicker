using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;

namespace Umbraco.Community.IconPicker.PropertyEditors.IconPicker;

public class IconPickerConfigurationEditor(IIOHelper ioHelper, IEditorConfigurationParser editorConfigurationParser)
    : ConfigurationEditor<IconPickerConfiguration>(ioHelper, editorConfigurationParser);