var app = app || {};

var notificationView = new app.NotificationView({}),
    foodCollection = new app.FoodCollection([]),
    profileModel = new app.ProfileModel({}),
    navigationView = new app.NavigationView({}),
    foodCollectionView = new app.FoodCollectionView({
        collection: foodCollection,
        profile: profileModel,
        notification: notificationView
    }),
    profileView = new app.ProfileView({ model: profileModel });


$('#main-container').prepend(navigationView.render().el);
$('#foods').html(foodCollectionView.render().el);
$('#profile').html(profileView.render().el);
$('main').append(notificationView.render().el);

profileView.update();
