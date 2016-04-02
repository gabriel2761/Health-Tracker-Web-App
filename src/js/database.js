var app = app || {};

/**
 * Database that stores localStorage values.
 * Creates two key constants for saving values,
 * this.KEY for storing food-item information and
 * this.ID_COUNT for storing a unique ID for each food-item.
 * if localStorage returns null when retrieving the values,
 * then the keys are set with empty information.
 * @constructor
 */
app.Database = function() {
    this.KEY = 'awef83hriwalgbwaeg8ahwpfoiengp9seugbzspi3uhfsozigbps9zugbspigbp3PFQFNZKLNVZSKEFBSLEIGUBSPG9UQB';
    var items = JSON.parse(localStorage.getItem(this.KEY));
    if (items === null) localStorage.setItem(this.KEY, JSON.stringify([]));

    this.ID_COUNT = 'sldzijfo9s3gfzsos876bOBkuyfcKUtyfytrdJu643557FfjUTfkuyg9uhcnussbskxudgzzopowoskskxdjmgcxjk';
    var id = localStorage.getItem(this.ID_COUNT);
    if (id === null) localStorage.setItem(this.ID_COUNT, 0);
};

/**
 * Increments the ID value and returns a unique ID for a food-item
 * @return {Integer} unique value for the database
 */
app.Database.prototype.getId = function() {
    var id = parseInt(localStorage.getItem(this.ID_COUNT));
    localStorage.setItem(this.ID_COUNT, ++id);
    return id;
};

/**
 * Retrieves all food items from the localStorage
 * @return {array} objects containing food item information
 */
app.Database.prototype.getFoods = function() {
    return JSON.parse(localStorage.getItem(this.KEY));
};

/**
 * Adds a food item to localStorage
 * @param {FoodModel} food Item to be stored
 */
app.Database.prototype.addFood = function(food) {
    var today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear(),
        date = day + '-' + month + '-' + year;

    var foods = this.getFoods();
    var id = this.getId();


    foods.push({
        databaseId: id,
        date: date,
        name: food.get('name'),
        calories: food.get('calories'),
        brandname: food.get('brandname')
    });

    localStorage.setItem(this.KEY, JSON.stringify(foods));
};

/**
 * Removes a food item from localStorage, by finding
 * the id of the selected food-item from localStorage.
 * @param  {FoodModel} model FoodModel to be removed
 */
app.Database.prototype.removeFood = function(model) {
    var foods = this.getFoods();

    foods.forEach(function(food) {
        if (food.databaseId === model.get('databaseId')) {
            foods.splice(foods.indexOf(food), 1);
        }
    });

    localStorage.setItem(this.KEY, JSON.stringify(foods));
};

