sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("org.ubb.books.controller.BookTable", {
		onInit: function () {

		},

		onAddRow: function () {
			if (!this.newBookDialog) {
				this.newBookDialog = sap.ui.xmlfragment("org.ubb.books.view.BookDialog", this);
			}
			this.getView().addDependent(this.newBookDialog);
			
			var aItems = this.newBookDialog.getContent()[0].getContent();
			var oControl = aItems[15];
			oControl.setText("Save");
			this.newBookDialog.open();
		},

		handleSaveBtnBook: function (oEvent) {
			debugger;
			var bCreate = true;
			var oBook = {
				ISBN: "",
				Title: "",
				Author: "",
				PublishedDate: "",
				Language: "",
				TotalNr: 0,
				AvailableNr: 0
			};
			var oSimpleForm = oEvent.getSource().getParent().getParent();
			var aItems = oSimpleForm.getFormElements();
			var oControl = aItems[0].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.ISBN = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[1].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.Title = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[2].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.Author = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[3].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.PublishedDate = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[4].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.Language = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[5].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.TotalNr = parseInt(oControl.getValue());
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[6].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBook.AvailableNr = parseInt(oControl.getValue());
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
            this.getView().getModel().setUseBatch(false);
            
			var oButtonPressed = this.newBookDialog.getContent()[0].getContent()[15];
			var oButtonText = oButtonPressed.getText();
			if (oButtonText === "Save") {
				if (bCreate) {
					if (oBook.Tnrbooks >= oBook.Avnrbooks) {
						this.getView().getModel().create("/Books", oBook, {
							success: function () {
								MessageToast.show("Book inserted!");
							},
							error: function () {
								MessageToast.show("Book already exists!");
							}
						});

						this.newBookDialog.close();
						for (var i = 0; i < aItems.length - 1; i++) {
							aItems[i].getFields()[0].setValue("");
						}
					} else {
						MessageToast.show("Total nr of books is less than available!");
					}
				}
			} else {
				if (bCreate) {
					if (oBook.Tnrbooks >= oBook.Avnrbooks) {
						var sPath = this.getView().getContent()[0].getContent()[0].getTable().getSelectedContexts()[0].getPath();
						this.getView().getModel().update(sPath, oBook, {
							success: function () {
								MessageToast.show("Book updated!");
							},
							error: function () {
								MessageToast.show("Update error!");
							}
						});
					} else {
						MessageToast.show("Total nr of books is less than available!");
					}
				}
			}
		},

		onDeleteRow: function (oEvent) {
			debugger;
			var oSelectedItem = oEvent.getSource().getParent().getParent().getContent()[0].getTable().getSelectedContexts()[0];
			var sPath = oSelectedItem.getPath();
			this.getView().getModel().remove(sPath, {
				success: function () {
					MessageToast.show("Book deleted!");
				},
				error: function () {
					MessageToast.show("Book could not be deleted!");
				}
			});
		},

		onEditRow: function (oEvent) {
			if (!this.newBookDialog) {
				this.newBookDialog = sap.ui.xmlfragment("org.ubb.books.view.BookDialog", this);
			}
			this.getView().addDependent(this.newBookDialog);
			debugger;
			var aItems = this.newBookDialog.getContent()[0].getContent();
			var oControl = aItems[1];
			var oObject = this.getView().byId("bookTable").getTable().getSelectedContexts()[0].getObject();
			oControl.setValue(oObject.ISBN);
			oControl = aItems[3];
			oControl.setValue(oObject.Title);
			oControl = aItems[5];
			oControl.setValue(oObject.Author);
			oControl = aItems[7];
			oControl.setValue(oObject.Pdate);
			oControl = aItems[9];
			oControl.setValue(oObject.Language);
			oControl = aItems[11];
			oControl.setValue(oObject.Tnrbooks);
			oControl = aItems[13];
			oControl.setValue(oObject.Avnrbooks);
			oControl = aItems[15];
			oControl.setText("Update");
			this.newBookDialog.open();
		},
	});
});