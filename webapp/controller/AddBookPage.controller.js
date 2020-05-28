sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.AddBookPage", {
       
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

            if(oBook.Total >= oBook.Available) {
                this.getView().getModel().create("/Books", oBook, {
                    success: function () {
                        MessageToast.show("Book inserted! :)");
                    },
                    error: function () {
                        MessageToast.show("Error :(");
                    }
                });
            } else {
                MessageToast.show("Total should be greater than available! :(");
            }
       }

    });
 });