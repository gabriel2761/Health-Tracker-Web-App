var app = app || {};

var foodCollection = new app.FoodCollection([]);
var profileModel = new app.ProfileModel({});

var navigationView = new app.NavigationView({});

$('#container').prepend(navigationView.render().el);

var foodCollectionView = new app.FoodCollectionView({ collection: foodCollection, profile: profileModel });
$('#listview').html(foodCollectionView.render().el);

var profileView = new app.ProfileView({ model: profileModel });
$('#profile').html(profileView.render().el);
profileView.update();
profileView.showRecent();

