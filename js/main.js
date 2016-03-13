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

app.FoodCollectionView = Backbone.View.extend({
    tagName: 'section',
    render: function() {
        this.collection.each(this.addFood, this);
        return this;
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food });
        this.$el.append(foodItemView.render().el);
    }
});

app.FoodItemView = Backbone.View.extend({
    tagName: 'section',
    className: 'food-item',
    template: _.template($('#food-item').html()),
    render: function() {
        var foodTemplate = this.template(this.model.toJSON());
        this.$el.html(foodTemplate);
        return this;
    },
});

app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel
});

var pizza = new app.FoodModel({ name: 'pizza' });

var foodCollection = new app.FoodCollection([
    pizza
]);


var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection });

var foodSearchView = new app.FoodSearchView({
    model: new app.FoodModel()
});
