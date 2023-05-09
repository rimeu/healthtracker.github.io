var app = app || {};

//App View

app.AppView = Backbone.View.extend({
	el: '#healthTracker',
	currentResults: [],
	events: {
		'click #search-btn': 'searchFood'
	},

	initialize: function(){
		this.$input = this.$('#search-text');
		this.$resultList = this.$('#resultList');
		
		this.listenTo(app.ResultCollection, 'add', this.renderResult);
		this.listenTo(app.FoodCollection, 'add', this.renderFood);
		this.listenTo(app.FoodCollection, 'all', this.renderAllFood);
		app.ResultCollection.fetch();
		app.FoodCollection.fetch();

		// Results will state even if the page is refeshed
		this.renderAllResults();
		this.renderAllFood();

	},

	searchFood: function(){
		var self = this;
		var appId = '3313ab4e';
		var appKey = '62c40c5e387805c3cd4e7c0aa9f4be0b';
		var query = this.$input.val().trim();
		//console.log(query);
		var nutrionixUrl = 'https://api.nutritionix.com/v1_1/search/' + query + '?results=0:10&fields=item_name,brand_name,item_id,nf_calories&appId=' + appId + '&appKey=' + appKey; 


		// Perform Ajax Request
		$.ajax({
			method:'GET',
			dataType: 'json',
			url: nutrionixUrl
		}).done(function(data){
			this.currentResults = data.hits;
			// This is to clear out old data from collection everytime
			// ajax request is performed.
			app.ResultCollection.clearAllResults();
			$('#resultList').empty();
			this.currentResults.forEach(function(item){
				var itemName = item.fields.item_name;
				var brandName = item.fields.brand_name;
				var calories = item.fields.nf_calories;

				app.ResultCollection.create({
					itemName: itemName,
					brandName: brandName,
					calories: calories
				});
			});
		}).fail(function(){
			window.alert("Nutritionix API is currently unavailable. Please try again later!");
		});

		this.$input.val('');
	},

	renderResult: function(result) {
		var view = new app.ResultView({model: result});
		$("#resultList").append(view.render().el);
	},

	renderAllResults: function () {
		$("#resultList").empty();
		app.ResultCollection.each(this.renderResult, this);
	},

	renderFood: function(result){
		var view = new app.FoodView({model:result});
		$('#foodList').append(view.render().el);
	},

	renderAllFood: function(){
		$('#foodList').empty();
		app.FoodCollection.each(this.renderFood, this);
		this.renderCalories();
	},

	renderCalories: function() {
		var calorieUI = $("#totalCalories");
		var currentTotalCalories = app.FoodCollection.sumCalories();
		calorieUI.empty();
		calorieUI.html(currentTotalCalories);

	}

});