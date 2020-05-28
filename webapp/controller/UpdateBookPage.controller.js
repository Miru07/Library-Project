sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.UpdateBookPage", {

      onUpdateBook(oEvent) {
         var oBook =  {
              ISBN: "",
              Title: "",
              Author: "",
              Published: null,
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
            
            const sPath = "/Books('" + oBook.ISBN + "')"
            this.getView().getModel().update(sPath, oBook, {
                success: function () {
                    MessageToast.show("Book update! :)");
                },
                error: function () {
                    MessageToast.show("Error from the dark side :(");
                }
            });
        } else {
            MessageToast.show("Total should be greater than available! :(");
        }
     }
       
    });
 });