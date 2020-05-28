sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.UpdateBookPage", {

      onUpdateBook(oEvent) {
         var oBook =  {
              ISBN: "",
              Title: "",
              Author: "",
              PublishedDate: "",
              Language: "",
              TotalNr: 0,
              AvailableNr: 0
          };
          debugger;
          oBook.ISBN = this.getView().byId("isbn").getValue();
          oBook.Title = this.getView().byId("title").getValue();
          oBook.Author = this.getView().byId("author").getValue();
          oBook.PublishedDate = new Date(this.getView().byId("publishedDate").getValue());
          oBook.Language = this.byId("language").getValue();
          oBook.TotalNr = this.byId("totalBooks").getValue();
          oBook.AvailableNr = this.byId("availableBooks").getValue();

          this.getView().getModel().update("/Books", oBook, {
              success: function () {
                  MessageToast.show("Book update!");
              },
              error: function () {
                  MessageToast.show("Error :(");
              }
          });
     }
       
    });
 });