sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.DeleteBookPage", {
       
        onDeleteBook(oEvent) {
            const aSelectedContexts = this.byId("deleteBookTable").getSelectedContexts();

            const sPath = aSelectedContexts[0].getPath();

            this.getView().getModel().remove(sPath);
        }
    });
 });