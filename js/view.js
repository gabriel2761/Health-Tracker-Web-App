var app = app || {};

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

app.FoodCollectionView = Backbone.View.extend({
    template: _.template($('#food-collection').html()),
    events: {
        'keydown #search-bar': 'search'
    },
    initialize: function() {
        this.collection.on('add', this.addFood, this);
    },
    search: function(e) {
        console.log($('#search-bar').val());
    },
    render: function() {
        this.$el.html(this.template);
        this.collection.each(this.addFood, this);
        return this;
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food });
        this.$el.append(foodItemView.render().el);
    }
});
