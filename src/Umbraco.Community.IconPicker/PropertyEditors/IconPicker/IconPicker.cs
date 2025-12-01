using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;

namespace Umbraco.Community.IconPicker.PropertyEditors.IconPicker;

[DataEditor(
    alias: PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerAlias,
    name: PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerNiceName,
    view: PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerView,
    Group = PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerGroup,
    Icon = PackageConstants.PropertyEditors.IconPicker.DataEditor.IconPickerIcon)]
public class IconPicker(
    IDataValueEditorFactory dataValueEditorFactory,
    IIOHelper ioHelper,
    IEditorConfigurationParser editorConfigurationParser)
    : DataEditor(dataValueEditorFactory)
{
    protected override IConfigurationEditor CreateConfigurationEditor() => new IconPickerConfigurationEditor(ioHelper, editorConfigurationParser);
}