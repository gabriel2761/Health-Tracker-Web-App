var app = app || {};

app.Food = Backbone.Model.extend({
    defaults: {
        food: ''
    }
});

app.FoodView = Backbone.View.extend({
    el: '#search-container',
    events: {
        'click #search-button': 'appendFood'
    },
    initialize: function() {
        this.template = _.template('<button id="search-button" class="search-button">Search</button>');
        this.food = _.template('');
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    },
    appendFood: function() {
        $('#food-list').append('<li>this works</li>');
    }
});

var foodView = new app.FoodView({
    model: new app.Food()
});
