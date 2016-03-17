var app = app || {};

var foodCollection = new app.FoodCollection([]);


var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection });
$('#container').html(foodCollectionView.render().el);
