let recipeForm = document.getElementById('recipe-form'); //Here we're grabbing references to vital html elements
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let displayArea = document.getElementById('display-area');

let recipes = []; //to keep track of all the recipes users add

recipeForm.addEventListener('submit', function(event) {
    event.preventDefault(); //upon submission of the form this function is called. Refreshing the browser is prevented

    let enteredRecipeName = recipeName.value; //grabbing the values from the submitted forms and storing them.
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;

    let newRecipe = { //creating the new recipe with the variables in the form
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps
    };

    recipes.push(newRecipe); //adding the new recipe to the array of recipes

    recipeName.value = ''; //clearing the form input fields to be used again
    ingredients.value = '';
    steps.value = '';   

    displayRecipe(newRecipe);

});

function displayRecipe(recipe) {
    let recipeDiv = document.createElement('div'); //creating a new div element for the new recipe to be displayed in

    let recipeHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Steps:</strong> ${recipe.steps}</p>
    `;

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