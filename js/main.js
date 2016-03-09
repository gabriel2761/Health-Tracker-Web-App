var app = app || {};

app.Food = Backbone.Model.extend({
    name: ''
});

app.FoodCollection = Backbone.Collection.extend({
    model: app.Food
});

app.FoodCollectionView = Backbone.View.extend({
    events: {
        'click #search-button': 'addFood'
    },
    initialize: function() {
        this.collection = new app.FoodCollection();
        this.render();
    },
    render: function() {
        console.log('fish fish');
    },
    addFood: function() {
        // $('#foodCollection').append('<p>This is a food</p>');
        console.log('miko');
    }
});

var foodCollection = new app.FoodCollectionView();
