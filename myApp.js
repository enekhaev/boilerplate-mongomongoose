require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    name: String, 
    age: Number,
    favoriteFoods: {
      type: Array,
      of: String
    }});

const Person = mongoose.model('Person', personSchema);
const mySecret = process.env['MONGO_URI']

mongoose.connect(mySecret);

let evgenyNekhaev = new Person({
    name: "Evgeny Nekhaev",
    age: 27,
    favoriteFoods: ['Orange', 'Banana', 'Hamburger']
  });
const createAndSavePerson = (done) => {
  evgenyNekhaev.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]},
  {name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, result) {
    if (err) return console.log(err);
    done(null, result);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function (err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec(
    function(error, people) {
      if (error) return console.log(error);
      done(null, people);
    }
  )
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
