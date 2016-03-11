var app = app || {};

app.Food = Backbone.Model.extend({
    defaults: {
        food: ''
    }
});

app.FoodView = Backbone.View.extend({
    el: '#search-container',
    initialize: function() {
        this.template = _.template('<button class="search-button">Search<%= name %></button>');
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    }
});

var foodView = new app.FoodView({
    model: new app.Food()
});

console.log(foodView.toJSON());
