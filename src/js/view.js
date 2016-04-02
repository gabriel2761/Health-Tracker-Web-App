var app = app || {};

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
            date = '';

        $('#total-calories').text(this.model.get('totalCalories'));
        $('#profile-foods').empty();

        this.database = new app.Database();
        this.database.getFoods().forEach(function(food) {

            var foodItemModel = new app.FoodModel({
                databaseId: food.databaseId,
                date: food.date,
                name: food.name,
                calories: food.calories,
                brandname: food.brandname,
            });

            var foodItemView = new app.FoodItemView({
                model: foodItemModel,
                className: 'food-item profile-item',
                profile: self.model
            });

            if (date !== food.date) {
                $('#profile-foods').prepend('<h3 id="date-heading" class="date-heading">' + food.date + '</h3>');
            }

            date = food.date;
            foodItemView.delegateEvents({ 'click #trash': 'remove' });
            $(foodItemView.render().el).insertAfter('#date-heading');
        });
    }
});

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
        this.model.add();
        this.profile.update();
        $('#notification').addClass('show');
        $('#notification-brandname').html('added ' + this.model.get('brandname'));

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
    show: function() {

    },
});
