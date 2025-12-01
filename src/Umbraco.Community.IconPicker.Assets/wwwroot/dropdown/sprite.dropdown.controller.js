angular.module("umbraco").controller("Dropdown.Controller", [
    "$scope",
    "IconPickerApiResource", "notificationsService",
    function ($scope, iconPickerApiResource, notificationsService) {
        var vm = this;
        vm.showSpritePicker = false;
        function init() {

            if ($scope.model.value == null) {
                SetValue("","","");
            }
            vm.folders = [];
            vm.selectFolder = selectFolder;
            iconPickerApiResource.getFolders().then(function (response) {
                if (response.succeeded) {
                    vm.folders = response.content;
                    vm.folders.forEach(function (folder) {
                        if (folder === $scope.model.value.folder) {
                            vm.selectedFolder = folder;
                        }
                    });
                    if (vm.selectedFolder == null)
                    {
                        vm.selectedFolder = vm.folders[0];
                    }
                    loadSprites(vm.selectedFolder);
                    vm.showSpritePicker = true;
                } else {
                    notificationsService.error("Error", response.errorMessage);
                }
            });
        }

        function loadSprites(path) {
            vm.items = [];
            vm.selectedItem = null;
            vm.select = select;
            iconPickerApiResource.getSprites(path).then(function (response) {
                if (response.succeeded) {
                    vm.items = response.content;
                    vm.items.forEach(function (sprite) {
                        if ($scope.model.value != null) {
                            if (sprite.name === $scope.model.value.spriteName && sprite.path === $scope.model.value.spritePath) {
                                vm.selectedItem = sprite;
                            }
                        }
                    });
                    if (vm.selectedItem == null)
                    {
                        vm.selectedItem = vm.items[0];
                         SetValue(vm.selectedFolder, vm.selectedItem.name, vm.selectedItem.path);
                    }
                } else {
                    notificationsService.error("Error", response.errorMessage);
                }
            });
        }

        init();

        function selectFolder() {
            SetValue(vm.selectedFolder, "", "");
            loadSprites($scope.model.value.folder);
        }

        function select() {
            SetValue(vm.selectedFolder, vm.selectedItem.name, vm.selectedItem.path);
        }

        function SetValue(folder, spriteName, spritePath) {
            $scope.model.value = {
                folder: folder,
                spriteName: spriteName,
                spritePath: spritePath
                }
        }
    }
]);