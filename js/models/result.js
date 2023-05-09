var app = app || {};

// Result Model
app.Result = Backbone.Model.extend({
	defaults: {
		itemName: '',
		brandName: '',
		calories: 0
	}
})
