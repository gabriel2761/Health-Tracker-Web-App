var app = app || {};

/**
 * Search results from the nutritionix API, used to populate
 * the FoodCollectionView with a list of food items. Sends
 * an AJAX request to nutritionix using a keyword from the user.
 *
 * @constructor
 */
app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel,
    initialize: function() {
        self = this;
    },
    search: function(food, successful) {
        self = this;
        var url = 'https://api.nutritionix.com/v1_1/search/' + food + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=283e6104&appKey=7adbf74351829801e39b98eb74723505';
        $.ajax({
            url: url,
            dataType: 'json',
        }).done(function(result) {
            var foods = result.hits;

            if (foods.length === 0) {
                successful('empty');
                return;
            }

            foods.forEach(function(food) {
                self.add(new app.FoodModel({
                    name: food.fields.item_name,
                    brandname: food.fields.brand_name,
                    calories: Math.round(food.fields.nf_calories),
                }));
            });
            successful(true);
        }).error(function(jqXHR, textStatus, errorThrown) {
            successful(false);
        });
    }
});
