namespace Umbraco.Community.IconPicker;

public static class PackageConstants
{
    public class PropertyEditors
    {
        public static class IconPicker
        {
            public static class DataEditor
            {
                public const string IconPickerAlias = "Umbraco.Community.IconPicker";

                public const string ServerVariableName = "IconPicker";
                public const string IconPickerName = "iconpicker";
                public const string IconPickerNiceName = "Icon Picker";
                public const string IconPickerIcon = "icon-art-easel";
                public const string IconPickerGroup = "Media";
                public const string IconPickerView = IconPickerBasePath + IconPickerAlias + "/" + IconPickerName + ".html";
                private const string IconPickerBasePath = "~/App_Plugins/";
                public const string SpriteDropdownView = IconPickerBasePath + DataEditor.IconPickerAlias + "/dropdown/sprite-dropdown.html";
            }

            public const string SvgSymbolName = "symbol";
            public const string SvgExtension = ".svg";
        }
    }
}
