var app = app || {};

app.FoodModel = Backbone.Model.extend({
    defaults: function() {
        return {
            name: '',
            calories: 0,
            brandname: '',
        };
    },
    add: function() {
        var food = JSON.parse(localStorage.getItem(app.FOODKEY));
        food.push(this);
        localStorage.setItem(app.FOODKEY, JSON.stringify(food));
    },
});
