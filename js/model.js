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
    render: function() {
        var foods = JSON.parse(localStorage.getItem(app.FOODKEY));
        var total = 0;

        foods.forEach(function(food) {
            total += food.calories;
        });

        this.totalCalories = total;

        console.log(this.totalCalories);
    },
});