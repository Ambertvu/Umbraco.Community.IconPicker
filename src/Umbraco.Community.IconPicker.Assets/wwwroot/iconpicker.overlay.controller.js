angular.module("umbraco").controller("IconPickerOverlay.Controller", [
    "$scope",
    "IconPickerApiResource",
    "localizationService",
    "notificationsService",
    "$sce",

    function ($scope, iconPickerApiResource, localizationService, notificationsService, $sce) {

        var vm = this;

        function init() {

            localizationService.localize("iconPicker_overlayTitle").then(function (value) {
                vm.title = value;
            });
            vm.items = [];
            vm.orderBy = "name";

            vm.allowSubmit = false;

            vm.select = select;
            vm.submit = submit;
            vm.close = close;

            if ($scope.model.sprite != null) {
                iconPickerApiResource.getImagesFromSprite($scope.model.sprite.spritePath).then(function (response) {
                    if (response.succeeded) {
                        vm.items = response.content;
                        vm.items.forEach(function (image) {
                            iconPickerApiResource.getIconSpriteHtml(image.name, image.path).then(function (response) {
                                if (response.succeeded) {
                                    image.htmlString = $sce.trustAsHtml(response.content.Value);
                                }
                            });
                        });
                    } else {
                        notificationsService.error("Error", response.errorMessage);
                    }
                });
            } else {
                notificationsService.error("Error", "could not get filepath from PropertyEditor");
            }
        };

        function select(item) {
            $scope.model.value = item;
            submit();
        };

        function submit() {
            if ($scope.model.submit) {
                $scope.model.submit($scope.model.value);
            }
        };

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        };

        init();
    }
]);