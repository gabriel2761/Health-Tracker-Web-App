var app = app || {};

app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel
});