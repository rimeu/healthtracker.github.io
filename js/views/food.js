var app = app || {};

// Food View
app.FoodView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#food-template').html()),
	
	events: {
		'click #deleteBtn' : 'deleteFoodItem'
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	deleteFoodItem : function(){
		this.model.destroy();
	}

});