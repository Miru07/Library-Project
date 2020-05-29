sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.AddBookPage", {
       
        onInit : function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
               bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
         },

        onAddBook(oEvent) {
           var oBook =  {
                ISBN: "",
                Title: "",
                Author: "",
                Published: "",
                Language: "",
                Total: 0,
                Available: 0
            };
            
            debugger;
            oBook.ISBN = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();
            oBook.Published = this.getView().byId("publishedDate").getValue();
            oBook.Language = this.byId("language").getValue();
            oBook.Total = this.byId("totalBooks").getValue();
            oBook.Available = this.byId("availableBooks").getValue();

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("addSuccess", [sRecipient]);
            var errorBackMsg = oBundle.getText("backError", [sRecipient]);
            var errorFrontMsg = oBundle.getText("addFrontError", [sRecipient]);

            if(oBook.Total >= oBook.Available) {
                this.getView().getModel().create("/Books", oBook, {
                    success: function () {
                        MessageToast.show(successMsg);
                    },
                    error: function () {
                        MessageToast.show(errorBackMsg);
                    }
                });
            } else {
                MessageToast.show(errorFrontMsg);
            }
       }

    });
 });