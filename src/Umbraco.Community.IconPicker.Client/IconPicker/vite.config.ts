import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: {
                "iconpicker-property-editor-ui.element": "src/iconpicker-property-editor-ui.element.ts",
                "icon-picker-dialog.element": "src/icon-picker-dialog.element.ts",
                "sprite-picker-property-editor-ui.element": "src/sprite-picker-property-editor-ui.element.ts"
            },
            formats: ["es"],
        },
        outDir: "../../Umbraco.Community.IconPicker.Assets/wwwroot",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },
    },
    base: "/App_Plugins/Umbraco.Community.IconPicker/", // the base path of the app in the browser (used for assets)
});