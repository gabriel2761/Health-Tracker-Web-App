var app = app || {};

app.Food = Backbone.Model.extend({
    defaults: {
        food: ''
    }
});

app.FoodView = Backbone.View.extend({
    el: '#search-container',
    events: {
        'click': 'alertUser'
    },
    initialize: function() {
        this.template = _.template('<button class="search-button">Search</button>');
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    },
    alertUser: function() {
        alert("This works");
    }
});

var foodView = new app.FoodView({
    model: new app.Food()
});
