sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment",
 ], function (Controller, MessageToast, ResourceModel, Fragment) {
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
        },

        onUpdateDialogOpen: function(event) {
            var oView = this.getView();
                if (!this.byId("updateDialog") ) {
				    
				Fragment.load({
					id: oView.getId(),
                    name: "org.ubb.books.fragment.UpdateBookDialog",
                    controller: this
				}).then(function (oDialog) {
                    oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
                this.insertPlaceholderData();
				this.byId("updateDialog").open();
            }
        },

        onUpdateDialogClose : function () {
			this.byId("updateDialog").close();
        },

        insertPlaceholderData() {
            debugger;
            var oItem = this.getView().byId("deleteBookTable").getSelectedItem();

            if (oItem !== null){
                var oEntry = oItem.getBindingContext().getObject();
                this.getView().byId('isbn').setValue(oEntry.ISBN);
                this.getView().byId('title').setValue(oEntry.Title);
                this.getView().byId('author').setValue(oEntry.Author);
                this.getView().byId('language').setValue(oEntry.Language);
                this.getView().byId('publishedDate').setValue(oEntry.Published);
                this.getView().byId('availableBooks').setValue(oEntry.Available);
                this.getView().byId('totalBooks').setValue(oEntry.Total);
            }
        },

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

            oBook.ISBN = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();

            var oDate = this.getView().byId("publishedDate").getValue();
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" }); 
            var date = new Date(oDate);  
            var dateFormatted = dateFormat.format(date);

            oBook.Published = dateFormatted;
            oBook.Language = this.byId("language").getValue();
            oBook.Total = this.byId("totalBooks").getValue();
            oBook.Available = this.byId("availableBooks").getValue();

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("updateSuccess", [sRecipient]);
            var errorBackMsg = oBundle.getText("backError", [sRecipient]);
            var errorFrontMsg = oBundle.getText("updateFrontError", [sRecipient]);

            if(oBook.Total >= oBook.Available) {
            
                const sPath = "/Books('" + oBook.ISBN + "')"
                this.getView().getModel().update(sPath, oBook, {
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