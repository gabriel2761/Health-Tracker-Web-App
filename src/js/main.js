var app = app || {};

function showTutorial() {
    $('#tutorial-container').removeClass('hidden');
}

$('#close-button').click(function() {
    localStorage.setItem('first-visit', '1');
    $('#tutorial-container').addClass('hidden');
});

var firstVisit = localStorage.getItem('first-visit');
if (firstVisit === null) showTutorial();


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
$('#search-button').click();