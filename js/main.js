var app = app || {};

app.FoodModel = Backbone.Model.extend({
    defaults: {
        name: '',
        calories: 0
    }
});

app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel
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

var foodCollection = new app.FoodCollection([
    new app.FoodModel({ name: 'Pizza' }),
    new app.FoodModel({ name: 'Carrot' }),
    new app.FoodModel({ name: 'Quich' })
]);

var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection });
$('#food-collection').html(foodCollectionView.render().el);

var foodSearchView = new app.FoodSearchView({});
