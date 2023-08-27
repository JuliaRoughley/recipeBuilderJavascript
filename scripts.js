let recipeForm = document.getElementById('recipe-form'); //Here we're grabbing references to vital html elements
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let imageUrl = document.getElementById('recipeImage');
let displayArea = document.getElementById('display-area');

let recipes = []; //to keep track of all the recipes users add

recipeForm.addEventListener('submit', function(event) {
    event.preventDefault(); //upon submission of the form this function is called. Refreshing the browser is prevented

    let enteredRecipeName = recipeName.value; //grabbing the values from the submitted forms and storing them.
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;
    let enteredImageUrl = imageUrl.value;

    let newRecipe = { //creating the new recipe with the variables in the form
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredImageUrl
    };

    recipes.push(newRecipe); //adding the new recipe to the array of recipes
    localStorage.setItem('recipes', JSON.stringify(recipes)); //adding to local storage in the browser

    recipeName.value = ''; //clearing the form input fields to be used again
    ingredients.value = '';
    steps.value = '';   
    imageUrl.value = '';

    displayRecipe(newRecipe);

});


// Check if recipes exist in local storage
if (localStorage.getItem('recipes')) {
    // Load recipes from local storage and parse the JSON string
    recipes = JSON.parse(localStorage.getItem('recipes'));

    // Display the loaded recipes on the page
    recipes.forEach(recipe => {
        displayRecipe(recipe);
    });
}


function displayRecipe(recipe) {
    let recipeDiv = document.createElement('div'); //creating a new div element for the new recipe to be displayed in

    let recipeHTML = `
    <h3>${recipe.name}</h3>
    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
    <p><strong>Steps:</strong> ${recipe.steps}
`;

// Add the image if an image URL is provided
if (recipe.image) {
    recipeHTML += `<img src="${recipe.image}" alt="Picture of ${recipe.name}">`;
}

recipeHTML += `</p>`;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Recipe";
    let index = recipes.indexOf(recipe);
    deleteButton.onclick = function() {
        deleteRecipe(index);
    };

    // Set the HTML content of the div
    recipeDiv.innerHTML = recipeHTML;

    // Append the delete button to the recipe div
    recipeDiv.appendChild(deleteButton);

    displayArea.appendChild(recipeDiv);
}


function deleteRecipe(index) {
    // Remove recipe from the array recipes
    recipes.splice(index, 1);

    localStorage.setItem('recipes', JSON.stringify(recipes)); //updating local storage

    // Refresh the Display
    refreshDisplay();
}

function refreshDisplay() {
    // Clear the display area
    displayArea.innerHTML = '';

    // Display each recipe using the displayRecipe function
    recipes.forEach((recipe, index) => {
        displayRecipe(recipe, index);
    });
}