var app = app || {};

// Result View

app.ResultView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#result-template').html()),

	events: {
		'click #addFoodBtn': 'addToFoodCollection'
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	addToFoodCollection: function(){
		app.FoodCollection.create({
			itemName: this.model.get('itemName'),
			brandName: this.model.get('brandName'),
			calories: this.model.get('calories'),
		});
	}

});