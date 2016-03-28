var app = app || {};

app.Database = function() {
    this.KEY = 'awef83hriwalgbwaeg8ahwpfoiengp9seugbzspi3uhfsozigbps9zugbspigbp3PFQFNZKLNVZSKEFBSLEIGUBSPG9UQB';
    var items = JSON.parse(localStorage.getItem(this.KEY));
    if (items === null) localStorage.setItem(this.KEY, JSON.stringify([]));
};

app.Database.prototype.getFoods = function() {
    return JSON.parse(localStorage.getItem(this.KEY));
};

app.Database.prototype.addFood = function(food) {
    var today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear(),
        date = day + '-' + month + '-' + year;

    var foods = this.getFoods();
    foods.push({
        date: date,
        name: food.get('name'),
        calories: food.get('calories'),
        brandname: food.get('brandname')
    });
    localStorage.setItem(this.KEY, JSON.stringify(foods));
};

app.Database.prototype.removeFood = function(food) {
    var foods = this.getFoods();
    foods.splice(foods.indexOf(food), 1);
    localStorage.setItem(this.KEY, JSON.stringify(foods));
};

