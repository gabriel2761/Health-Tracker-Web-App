var app = app || {};

app.FoodModel = Backbone.Model.extend({
    defaults: {
        name: ''
    }
});

app.FoodSearchView = Backbone.View.extend({
    el: '#search-container',
    events: {
        'click #search-button': 'appendFood'
    },
    initialize: function() {
        this.template = _.template('<button id="search-button" class="search-button">Search</button>');
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    },
    appendFood: function() {
        $('#food-list').append('<li>this works</li>');
    }
});

app.FoodItemView = Backbone.View.extend({
    tagName: 'list',
});

var pizza = new app.FoodModel();

var foodSearchView = new app.FoodSearchView({
    model: new app.FoodModel()
});
