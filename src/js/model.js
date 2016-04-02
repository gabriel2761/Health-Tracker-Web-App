var app = app || {};

/**
 * Backbone model for food template, contains information
 * to be filled and sent to the FoodCollection. Clickable
 * items are filled with this data.
 *
 * Contains two inner function that add or remove this
 * model in localStorage
 *
 * @constructor
 */
app.FoodModel = Backbone.Model.extend({
    defaults: {
        databaseId: -1,
        name: '',
        calories: 0,
        brandname: '',
        date: '',
    },
    add: function() {
        var database = new app.Database();
        database.addFood(this);
    },
    remove: function() {
        var database = new app.Database();
        database.removeFood(this);
    }
});

/**
 * Backbone model to present the total calories for the user,
 * Contains update function to be watched by the ProfileView
 * when fired. 'totalCalories' is watched and appended when
 * food-items are updated
 *
 * @constructor
 */
app.ProfileModel = Backbone.Model.extend({
    defaults: {
        totalCalories: 0
    },
    initialize: function() {
        this.update();
    },
    update: function() {
        var totalCalories = 0;
        var database = new app.Database();

        database.getFoods().forEach(function(food) {
            totalCalories += food.calories;
        });

        this.set('totalCalories', totalCalories);
    },
});