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
        'click #search-button': 'search',
        'keyup #search-bar': 'checkEnterPressed'
    },
    initialize: function() {
        this.collection.on('add', this.addFood, this);
        this.collection.on('reset', this.render, this);
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    search: function() {
        var food = $('#search-bar').val();
        this.collection.reset();
        this.collection.search(food);
        this.collection.each(this.addFood, this);
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food });
        this.$el.append(foodItemView.render().el);
    },
    checkEnterPressed: function(event) {
        if (event.keyCode === 13) this.search()
    },
});
