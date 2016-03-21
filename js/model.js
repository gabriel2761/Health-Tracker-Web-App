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

app.ProfileModel = Backbone.Model.extend({
    defaults: function() {
        return {
            totalCalories: 0
        };
    },
    initialize: function() {
        this.update();
    },
    update: function() {
        var foods = JSON.parse(localStorage.getItem(app.FOODKEY));
        var totalCalories = 0;

        foods.forEach(function(food) {
            totalCalories += food.calories;
        });

        this.set('totalCalories', totalCalories);
    },
});