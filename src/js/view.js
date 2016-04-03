var app = app || {};

/**
 * Navigation bar at the top, containing tabs to
 * toggle between the foodlist search results and
 * the users profile. Only visible on mobile width
 * media query.
 *
 * @constructor
 */
app.NavigationView = Backbone.View.extend({
    tagName: 'nav',
    className: 'navigation',
    template: _.template($('#navigation-template').html()),
    events: {
        'click #navigation-foods-tab': 'showFoods',
        'click #navigation-profile-tab': 'showProfile'
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    showFoods: function() {
        if ($('#foods').hasClass('hidden')) {
            $('#foods').removeClass('hidden');
            $('#profile').addClass('hidden');
        }

        if ($('#navigation-profile-tab').hasClass('underline-red')) {
            $('#navigation-profile-tab').removeClass('underline-red');
            $('#navigation-foods-tab').addClass('underline-red');
        }

    },
    showProfile: function() {
        if ($('#profile').hasClass('hidden')) {
            $('#profile').removeClass('hidden');
            $('#foods').addClass('hidden');
        }

        if ($('#navigation-foods-tab').hasClass('underline-red')) {
            $('#navigation-foods-tab').removeClass('underline-red');
            $('#navigation-profile-tab').addClass('underline-red');
        }
    }
});

/**
 * Backbone view containing the ProfileModel.
 * Used to show the list of added foods from the
 * localStorage and counts the total calories for
 * each day, and all foods in database.
 *
 * @constructor
 */
app.ProfileView = Backbone.View.extend({
    tagName: 'section',
    className: 'profile-view',
    template: _.template($('#profile-template').html()),
    initialize: function() {
        this.model.on('change', this.update, this);
    },
    render: function() {
        var profileTemplate = this.template(this.model.toJSON());
        this.$el.html(profileTemplate);
        return this;
    },
    update: function() {
        var self = this,
            date = null;
        // Shows the total calories of all foods in localStorage
        $('#total-calories').text(this.model.get('totalCalories'));
        $('#profile-foods').empty();

        // Loops and appends each item from localStorage
        // to the profile view.
        this.database = new app.Database();
        var foods = this.database.getFoods();
        foods.forEach(function(food) {

            var foodItemModel = new app.FoodModel({
                databaseId: food.databaseId,
                date: food.date,
                name: food.name,
                calories: food.calories,
                brandname: food.brandname,
            });

            // Converts the FoodItemModel into a profile-item
            var foodItemView = new app.FoodItemView({
                model: foodItemModel,
                className: 'food-item profile-item',
                profile: self.model
            });

            totalCaloriesToday += food.calories;

            // Appends the dates as headings from the
            // food-items to the profile view.
            if (date !== food.date || date === null) {
                var totalCaloriesToday = 0;
                date = food.date;

                // Counts the total calories for each day
                foods.forEach(function(item) {
                    if (date === item.date) {
                        totalCaloriesToday += item.calories;
                    }
                });

                // Appends and shows the date with the total
                // calories for that date.
                $('#profile-foods').prepend(
                    '<div id="date-heading" class="date-heading"><h3>' +
                    date + '</h3><p>total ' + totalCaloriesToday + '</p></div>'
                );
            }

            date = food.date;

            // Reuses FoodItemView and replaces the 'add' event
            // with a the remove event. Enables trash to be clicked.
            foodItemView.delegateEvents({ 'click #trash': 'remove' });
            $(foodItemView.render().el).insertAfter('#date-heading');
        });
    }
});

/**
 * Backbone view to present food-item information
 * to the user. Item is clickable and added if inside
 * the FoodCollectionView. Item is not clickable but enables
 * a trash/delete option to be shown when appended to the
 * ProfileView.
 *
 * View is attached to the ProfileView and it's assigned FoodModel
 * The model.add() and profile.update() function is called and
 * when the item is clicked and added to the localStorage.
 *
 * the model.remove() and profile.update() function is called
 * when the item is removed from the profile view.
 *
 * @constructor
 */
app.FoodItemView = Backbone.View.extend({
    tagName: 'section',
    className: 'food-item',
    template: _.template($('#food-item-template').html()),
    events: {
        click: 'addFood'
    },
    initialize: function(options) {
        this.profile = options.profile;
    },
    addFood: function() {
        $('#food-search-results').empty();
        this.model.add();
        this.profile.update();
        $('#notification').addClass('show');
        $('#notification-brandname').html('Added ' + this.model.get('brandname'));

        setTimeout(function() {
            $('#notification').removeClass('show');
        }, 1000);
    },
    render: function() {
        var foodTemplate = this.template(this.model.toJSON());
        this.$el.html(foodTemplate);
        return this;
    },
    remove: function() {
        this.model.remove();
        this.profile.update();
    },
});

/**
 * BackboneView that appends the food search results to the DOM.
 * Retrieves it's data from the FoodCollection, by passing a
 * keyword as parameter.
 *
 * Contains the search bar for the user to input the keyword.
 * Search is fired when user clicks the search button or presses
 * the enter key.
 *
 * @constructor
 */
app.FoodCollectionView = Backbone.View.extend({
    template: _.template($('#food-collection-template').html()),
    events: {
        'click #search-button': 'search',
        'keyup #search-bar': 'checkEnterPressed'
    },
    initialize: function(options) {
        this.profile = options.profile;
        this.collection.on('add', this.addFood, this);
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    search: function() {
        $('#food-search-results').empty();
        $('#loading-icon').removeClass('hidden');
        var food = $('#search-bar').val();
        this.collection.reset();
        this.collection.search(food);
        this.collection.each(this.addFood, this);
    },
    addFood: function(food) {
        $('#loading-icon').addClass('hidden');
        var foodItemView = new app.FoodItemView({ model: food, profile: this.profile });
        $('#food-search-results').append(foodItemView.render().el);
    },
    checkEnterPressed: function(event) {
        if (event.keyCode === 13) this.search();
    },
});

/**
 * NotificationBar, fired when food-item is addded to the
 * profile view. Contents is filled with the food-brand name
 */
app.NotificationView = Backbone.View.extend({
    id: 'notification',
    tagName: 'section',
    className: 'notification',
    template: _.template($('#notification-template').html()),
    render: function() {
        var template = this.template(this.model);
        this.$el.html(this.template);
        return this;
    },
});
