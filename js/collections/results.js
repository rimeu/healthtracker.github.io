var app = app || {};

var ResultCollection = Backbone.Collection.extend({
	model: app.Result,

	localStorage: new Backbone.LocalStorage('resultStorage'),

	clearAllResults: function(){
		_.invoke(this.toArray(), 'destroy');
	}
});

app.ResultCollection = new ResultCollection();