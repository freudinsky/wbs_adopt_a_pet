const pets = require('./petList.js')
const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send(`<h1>Adopt a pet!</h1> 
    <p>Browse through the links below to find your new furry friend.</p> 
    <ul>
    <li><a href="/animals/dogs">Dogs</a></li>
    <li><a href="/animals/cats">Cats</a></li>
    <li><a href="/animals/rabbits">Rabbits</a></li>
</ul>`);
})

app.get("/animals/:pet_type", (req,res) => {
    const petType = req.params.pet_type
    const petTypeArr = pets[petType]
    const petMapped = petTypeArr.map((pet, index) => `<li><a href="/animals/${petType}/${index}">${pet.name}</a></li>`).join('')
    res.send(`<h1>List of ${petType}</h1>
    <ul>
    ${petMapped}
    </ul>`)
})

app.get("/animals/:pet_type/:pet_id", (req, res) => {
    const petType = req.params.pet_type
    const petID = req.params.pet_id
    const pet = pets[petType][petID]
    res.send(
			`<h1>${pet.name}</h1><img src="${pet.url}"/><p>${pet.description}</p><ul><li>Breed: ${pet.breed}</li><li>Age: ${pet.age} years</li></ul>`
		);
})

const server = app.listen(8000, ()=> console.log("Server running :8000"))