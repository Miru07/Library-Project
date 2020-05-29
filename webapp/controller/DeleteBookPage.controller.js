sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.DeleteBookPage", {
       
        onInit : function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
               bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
         },

        onDeleteBook(oEvent) {
            const aSelectedContexts = this.byId("deleteBookTable").getSelectedContexts();

            const sPath = aSelectedContexts[0].getPath();

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("deleteSuccess", [sRecipient]);
            var errorBackMsg = oBundle.getText("backError", [sRecipient]);

            this.getView().getModel().remove(sPath, {
                success: function () {
                    MessageToast.show(successMsg);
                },
                error: function () {
                    MessageToast.show(errorBackMsg);
                }
            });
        }
    });
 });