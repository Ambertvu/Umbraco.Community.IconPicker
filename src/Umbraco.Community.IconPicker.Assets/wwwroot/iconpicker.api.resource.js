angular.module('umbraco.resources').factory('IconPickerApiResource',
    function ($http, umbRequestHelper) {

        if (!Umbraco.Sys.ServerVariables.IconPicker) {
            console.error("[IconPicker] Configuration missing: 'Umbraco.Sys.ServerVariables.IconPicker' is undefined. Please ensure you have called 'builder.AddIconPicker()' to register the URL in your Composer.");
        }

        var baseUrl = Umbraco.Sys.ServerVariables.IconPicker.iconpicker;

        return {
            getFolders: function () {
                return umbRequestHelper.resourcePromise(
                    $http.get(baseUrl + "GetFolders"));
            },
            getSprites: function (path) {
                return umbRequestHelper.resourcePromise(
                    $http.get(baseUrl + "GetSprites?path=" + path));
            },
            getImagesFromSprite: function (path) {
                return umbRequestHelper.resourcePromise(
                    $http.get(baseUrl + "GetImagesFromSprite?path=" + path));
            },
            getIconSpriteHtml: function (name, path) {
                return umbRequestHelper.resourcePromise(
                    $http.get(baseUrl + "GetSpriteImageHtml?name=" + name + "&path=" + path));
            },
        };
    }
);