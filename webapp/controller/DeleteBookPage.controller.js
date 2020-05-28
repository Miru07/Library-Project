sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.DeleteBookPage", {
       
        onDeleteBook(oEvent) {
            const aSelectedContexts = this.byId("deleteBookTable").getSelectedContexts();

            const sPath = aSelectedContexts[0].getPath();

            this.getView().getModel().remove(sPath, {
                success: function () {
                    MessageToast.show("Book deleted! :)");
                },
                error: function () {
                    MessageToast.show("Error from the dark side :(");
                }
            });
        }
    });
 });