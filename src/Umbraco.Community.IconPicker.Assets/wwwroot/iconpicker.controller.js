angular.module("umbraco").controller("IconPicker.Controller", [
    "$scope",
    "editorService",
    "focusService",
    "notificationsService",
    "IconPickerApiResource",
    "$sce",
    function ($scope, editorService, focusService, notificationsService, iconPickerApiResource, $sce) {

        const DEFAULT_CONFIG = {
            defaultValue: [],
            disableSorting: 1,
            enableFilter: 1,
            enableMultiple: 0,
            items: [],
            maxItems: 1,
            listType: "grid",
            overlayView: "/App_Plugins/Umbraco.Community.IconPicker/iconpicker-overlay.html",
            overlayOrderBy: "name",
            overlaySize: "small",
            addButtonLabelKey: "general_add",
        };

        const config = Object.assign({}, DEFAULT_CONFIG, $scope.model.config);
        const vm = this;

        // Public API
        vm.openIconPicker = openIconPicker;
        vm.removeSelectedIcon = removeSelectedIcon;

        function init() {
            initializeModel();
            initializeConfig();
            initializeViewModel();
            loadInitialData();
        }

        function initializeModel() {
            $scope.model.value = $scope.model.value || config.defaultValue;
        }

        function initializeConfig() {
            if (!Number.isInteger(config.maxItems)) {
                config.maxItems = Number.parseInt(config.maxItems) || DEFAULT_CONFIG.maxItems;
            }

            config.enableMultiple = Boolean(config.enableMultiple) && config.maxItems !== 1;
        }

        function initializeViewModel() {
            vm.allowEdit = false;
            vm.allowRemove = true;
            vm.allowSort = !config.disableSorting && config.maxItems !== 1;
            vm.addButtonLabelKey = config.addButtonLabelKey || "general_add";
            vm.selectedItem = null;
        }

        function loadInitialData() {
            if (hasValidSavedIcon()) {
                fetchAndDisplayIcon();
            } else {
                updateAllowAdd();
            }
        }

        function hasValidSavedIcon() {
            return $scope.model.value &&
                typeof $scope.model.value === 'object' &&
                $scope.model.value.name;
        }

        function fetchAndDisplayIcon() {
            const iconData = $scope.model.value;

            iconPickerApiResource.getIconSpriteHtml(iconData.name, iconData.path)
                .then(function (response) {
                    if (response.succeeded) {
                        const selected = angular.copy($scope.model.value);
                        selected.htmlString = $sce.trustAsHtml(response.content.Value);
                        vm.selectedItem = selected;
                        vm.allowAdd = false;
                    } else {
                        notificationsService.error("Error", response.errorMessage);
                        updateAllowAdd();
                    }
                });
        }

        function openIconPicker() {

            focusService.rememberFocus();
            const maxItemsForOverlay = config.maxItems === 0 ? 0 : config.maxItems - (vm.selectedItem ? 1 : 0);

            editorService.open({
                config: {
                    enableFilter: config.enableFilter,
                    enableMultiple: config.enableMultiple,
                    items: config.items,
                    listType: config.listType,
                    orderBy: config.overlayOrderBy,
                    maxItems: maxItemsForOverlay
                },
                view: config.overlayView,
                sprite: $scope.model.config.svgSprite,
                size: config.overlaySize || "small",
                submit: handleItemSelection,
                close: handleOverlayClose
            });
        }

        function handleItemSelection(selectedItem) {
            vm.selectedItem = selectedItem;
            $scope.model.value = angular.copy(vm.selectedItem);
            delete $scope.model.value.htmlString;

            vm.allowAdd = false;
            editorService.close();

            setDirty();
            setFocus();
        }

        function handleOverlayClose() {
            editorService.close();
            setFocus();
        }

        function setFocus() {
            const lastKnownFocus = focusService.getLastKnownFocus();
            if (lastKnownFocus) {
                lastKnownFocus.focus();
            }
        }

        function removeSelectedIcon() {
            focusService.rememberFocus();

            vm.selectedItem = null;
            $scope.model.value = config.enableMultiple ? [] : "";

            updateAllowAdd();
            setDirty();
        }

        function setDirty() {
            if ($scope.propertyForm) {
                $scope.propertyForm.$setDirty();
            }
        }

        function updateAllowAdd() {
            if (config.maxItems === 1) {
                vm.allowAdd = !vm.selectedItem;
                return;
            }

            const currentCount = Array.isArray($scope.model.value) ? $scope.model.value.length : ($scope.model.value ? 1 : 0);
            vm.allowAdd = config.maxItems === 0 || currentCount < config.maxItems;
        }

        init();
    }
]);