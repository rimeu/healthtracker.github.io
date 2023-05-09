var app = app || {};

// Food Model

app.Food = Backbone.Model.extend({
	defaults: {
		itemName: '',
		brandName: '',
		calories: 0
	},

})