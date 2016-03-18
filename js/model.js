var app = app || {};

app.FoodModel = Backbone.Model.extend({
    defaults: function() {
        return {
            name: '',
            calories: 0,
            brandname: '',
        };
    }
});
