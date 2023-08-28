let recipeForm = document.getElementById('recipe-form'); //Here we're grabbing references to vital html elements
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let imageUrl = document.getElementById('recipeImage');
let displayArea = document.getElementById('recipes-list');
let addRecipeBlock = document.getElementById('addRecipeBlock');
let recipeHeader = document.getElementById('title');

let editForm = document.getElementById('edit-form'); //grabbing references from the 'hidden' edit form in the html
let editRecipeName = document.getElementById('editRecipeName');
let editIngredients = document.getElementById('editIngredients');
let editSteps = document.getElementById('editSteps');
let editImageUrl = document.getElementById('editImageUrl');

let recipes = []; //to keep track of all the recipes users add

recipeForm.addEventListener('submit', function (event) {
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
    <p><strong>Steps:</strong> ${recipe.steps}`;

    // Add the image if an image URL is provided
    if (recipe.image) {
        recipeHTML += `<img src="${recipe.image}" alt="Picture of ${recipe.name}">`;
    }

    recipeHTML += `</p>`;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Recipe";
    let index = recipes.indexOf(recipe);
    deleteButton.onclick = function () {
        deleteRecipe(index);
    };



    let editButton = document.createElement('button');
    editButton.textContent = "Edit Recipe";
    editButton.onclick = function () {
        switchToEditMode(recipe, index);
    };

    // Set the HTML content of the div
    recipeDiv.innerHTML = recipeHTML;

    // Append the delete button to the recipe div
    recipeDiv.appendChild(editButton);
    recipeDiv.appendChild(deleteButton);

    recipeDiv.dataset.recipeIndex = index;

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


function switchToEditMode(recipe, index) {

    // Update the h2 element text to indicate edit mode
    recipeHeader.innerText = 'Edit your recipe';

    // Populate the edit form with the current recipe's details
    editRecipeName.value = recipe.name;
    editIngredients.value = recipe.ingredients;
    editSteps.value = recipe.steps;
    editImageUrl.value = recipe.image;

    // Show the edit form and hide the recipe details
    displayArea.style.display = 'none';
    addRecipeBlock.style.display = 'none';
    editForm.style.display = 'block';


    editImageUrl.addEventListener('input', function() {
        // Get the updated image URL
        const newImageUrl = editImageUrl.value;

    // Update the recipe image in the displayed recipe
    const recipeImage = displayArea.querySelector(`[data-recipe-index="${index}"] img`);
    if (recipeImage) {
        recipeImage.src = newImageUrl;
    }
    });
    // Add an event listener to the edit form's submission
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Update the recipe details with the edited values
        recipe.name = editRecipeName.value;
        recipe.ingredients = editIngredients.value;
        recipe.steps = editSteps.value;
        recipe.image = editImageUrl.value;

        // Save the updated recipe to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Refresh the display to show the updated recipe
        refreshDisplay();

        // Hide the edit form and show the recipe details again
        editForm.style.display = 'none';
        displayArea.style.display = 'block';
        addRecipeBlock.style.display = 'block';

        recipeHeader.innerText = 'Your Recipes'; // H2 changed back to indicate home
    });
}



function saveEditedRecipe(index) {
    let editRecipeName = document.getElementById('editRecipeName').value;
let editIngredients = document.getElementById('editIngredients'.value);
let editSteps = document.getElementById('editSteps').value;
let editImageUrl = document.getElementById('editImageUrl').value;

    // Update the recipe in the array
    recipes[index] = {
        name: editRecipeName,
        ingredients: editIngredients,
        steps: editSteps,
        image: editImageUrl
    };

    // Save updated recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Refresh the Display
    refreshDisplay();
}

