var app = app || {};

app.FoodItemView = Backbone.View.extend({
    tagName: 'section',
    className: 'food-item',
    template: _.template($('#food-item').html()),
    events: {
        click: 'addFood'
    },
    addFood: function() {
        console.log(this.model.toJSON().name);
    },
    render: function() {
        var foodTemplate = this.template(this.model.toJSON());
        this.$el.html(foodTemplate);
        return this;
    }
});

app.FoodCollectionView = Backbone.View.extend({
    template: _.template($('#food-collection').html()),
    events: {
        'click #search-button': 'search',
        'keyup #search-bar': 'checkEnterPressed'
    },
    initialize: function() {
        this.collection.on('add', this.addFood, this);
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    search: function() {
        $('#foodlist').empty();
        var food = $('#search-bar').val();
        this.collection.reset();
        this.collection.search(food);
        this.collection.each(this.addFood, this);
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food });
        $('#foodlist').append(foodItemView.render().el);
    },
    checkEnterPressed: function(event) {
        if (event.keyCode === 13) this.search();
    },
});
