var app = app || {};

app.FoodModel = Backbone.Model.extend({
    defaults: function() {
        return {
            name: '',
            calories: 0,
            brandname: '',
            date: '',
        };
    },
    add: function() {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var date = day + '-' + month + '-' + year;

        var foods = JSON.parse(localStorage.getItem(app.FOODKEY));
        foods.push({
            date: date,
            name: this.get('name'),
            calories: this.get('calories'),
            brandname: this.get('brandname')

        });
        localStorage.setItem(app.FOODKEY, JSON.stringify(foods));
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