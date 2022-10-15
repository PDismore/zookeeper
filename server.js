const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');
// Funtion that returns different information based on the query input (diet, name, species etc)
function filterByQuery( query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    // saves personalitytraits as dedicated array and if its a strin places into new array and saves
    if(query.personalityTraits){
        if(typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        }else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through wach train the the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults
}

// Sets route for n the server and sets the page to show the info from the data/animals.json file (animals array)
// app.get('/api/animals', (req, res) => {
//     res.json(animals);
// });

// Sets route that shows the array and also console logs any query (?name=Erica for ex) as json
app.get('/api/animals', (req, res) =>{
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
});