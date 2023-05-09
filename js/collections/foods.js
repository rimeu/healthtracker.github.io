var app = app || {};

// Todo collection
var FoodCollection = Backbone.Collection.extend({
	model: app.Food,

	localStorage: new Backbone.LocalStorage('foodStorage'),

	clearAllFoodItems: function(){
		_.invoke(tasks.toArray(), 'destroy');
	},

	sumCalories: function(){
		return this.reduce(function(memo, value) { 
			return memo + value.get("calories") 
		}, 0);
	}
});

app.FoodCollection = new FoodCollection();

