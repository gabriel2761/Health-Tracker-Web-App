var app = app || {};

var foodCollection = new app.FoodCollection([
    new app.FoodModel({ name: 'Pizza' }),
    new app.FoodModel({ name: 'Carrot' }),
    new app.FoodModel({ name: 'Quiche' }),
    new app.FoodModel({ name: 'Apple' }),
    new app.FoodModel({ name: 'Bannana' }),
    new app.FoodModel({ name: 'Chicken' }),
    new app.FoodModel({ name: 'Pad-see-ew' }),
]);


var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection });
$('#food-collection').html(foodCollectionView.render().el);
