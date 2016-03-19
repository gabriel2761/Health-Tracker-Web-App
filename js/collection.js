var app = app || {};
app.FOODKEY = '00171350164079791532768106613747518858072268586414085374652127518692281422029618450618146873715052348437598370353095255581323757727942884595778456445214324332932164034225461520571048702353787518605783';

app.FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel,
    initialize: function() {
        self = this;

        var food = JSON.parse(localStorage.getItem(app.FOODKEY));

        if (food === null) {
            localStorage.setItem(app.FOODKEY, JSON.stringify([]));
        } else {
            food.forEach(function(food) {
                self.add(food);
            });
        }

        console.log(food);
    },
    search: function(food) {
        var url = 'https://api.nutritionix.com/v1_1/search/' + food + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=283e6104&appKey=7adbf74351829801e39b98eb74723505';
        $.ajax({
            url: url,
            dataType: 'json',
        }).done(function(result) {
            var foods = result.hits;
            foods.forEach(function(food) {
                self.add(new app.FoodModel({
                    name: food.fields.item_name,
                    brandname: food.fields.brand_name,
                    calories: Math.round(food.fields.nf_calories),
                }));
            });
        }).error(function(jqXHR, textStatus, errorThrown) {
            console.log('Something went wrong');
        });
    }
});
