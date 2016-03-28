var app = app || {};

var foodCollection = new app.FoodCollection([]);
var profileModel = new app.ProfileModel({});
var navigationView = new app.NavigationView({});
var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection, profile: profileModel });
var profileView = new app.ProfileView({ model: profileModel });

$('#main-container').prepend(navigationView.render().el);
$('#foods').html(foodCollectionView.render().el);
$('#profile').html(profileView.render().el);

profileView.update();

