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
    },
    showProfile: function() {
        if ($('#profile').hasClass('hidden')) {
            $('#profile').removeClass('hidden');
            $('#foods').addClass('hidden');
        }
    }
});

app.ProfileView = Backbone.View.extend({
    tagName: 'section',
    className: 'profile-view',
    template: _.template($('#profile-template').html()),
    initialize: function() {
        self = this;
        this.model.on('change', this.update, this);
    },
    render: function() {
        var profileTemplate = this.template(this.model.toJSON());
        this.$el.html(profileTemplate);
        return this;
    },
    update: function() {
        $('#total-calories').text(this.model.get('totalCalories'));
        $('#profile-foods').empty();

        var foods = JSON.parse(localStorage.getItem(app.FOODKEY));
        foods.forEach(function(food) {
            var foodItemModel = new app.FoodModel({
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
            foodItemView.delegateEvents({ 'click #trash': 'remove' });
            $('#profile-foods').append(foodItemView.render().el);
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
        var food = $('#search-bar').val();
        this.collection.reset();
        this.collection.search(food);
        this.collection.each(this.addFood, this);
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food, profile: this.profile });
        $('#food-search-results').append(foodItemView.render().el);
    },
    checkEnterPressed: function(event) {
        if (event.keyCode === 13) this.search();
    },
});
