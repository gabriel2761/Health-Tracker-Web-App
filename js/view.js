var app = app || {};

app.ProfileView = Backbone.View.extend({
    tagName: 'section',
    template: _.template($('#profile-view').html()),
    initialize: function() {
        this.model.on('change', this.update, this);
    },
    render: function() {
        var profileTemplate = this.template(this.model.toJSON());
        this.$el.html(profileTemplate);
        return this;
    },
    update: function() {
        $('#total-calories').text(this.model.get('totalCalories'));
    },
});

app.FoodItemView = Backbone.View.extend({
    tagName: 'section',
    className: 'food-item',
    template: _.template($('#food-item').html()),
    events: {
        click: 'addFood'
    },
    initialize: function(options) {
        this.profile = options.profile;
    },
    addFood: function() {
        this.model.add();
        this.profile.render();
    },
    render: function() {
        this.profile.render();
        var foodTemplate = this.template(this.model.toJSON());
        this.$el.html(foodTemplate);
        return this;
    }
});

app.FoodCollectionView = Backbone.View.extend({
    template: _.template($('#food-collection').html()),
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
        $('#foodlist').empty();
        var food = $('#search-bar').val();
        this.collection.reset();
        this.collection.search(food);
        this.collection.each(this.addFood, this);
    },
    addFood: function(food) {
        var foodItemView = new app.FoodItemView({ model: food, profile: this.profile });
        $('#foodlist').append(foodItemView.render().el);
    },
    checkEnterPressed: function(event) {
        if (event.keyCode === 13) this.search();
    },
});
