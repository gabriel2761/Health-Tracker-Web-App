var app = app || {};

app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel,
    initialize: function() {
        self = this;
        self.search('fish');
    },
    search: function(food) {
        var url = 'https://api.nutritionix.com/v1_1/search/' + food + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=283e6104&appKey=7adbf74351829801e39b98eb74723505';
        $.ajax({
            url: url,
            dataType: 'json',
        }).done(function(result) {
            var foods = result.hits;
            foods.forEach(function(food) {
                var name = food.fields.item_name;
                self.add(new app.FoodModel({ name: name }));
            });
        }).error(function(jqXHR, textStatus, errorThrown) {
            console.log('Something went wrong');
        });
    }
});
