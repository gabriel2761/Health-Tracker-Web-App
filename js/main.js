var app = app || {};

var foodCollection = new app.FoodCollection([]);


var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection });
$('#listview').html(foodCollectionView.render().el);
