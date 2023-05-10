// i let my console logs during project in comments
//creating the result and button elements
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
// declaring api in a variable
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// problem with the import from .env
//const url =import.meta.env.VITE_TMDB_URL;

//creating the event listener for the search button

searchBtn.addEventListener("click", async () => {
  // Get user input value
  const userInp = document.getElementById("user-inp").value;

 //creating a condition in case of pressing search with no text introduced
  if (userInp.length === 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    try {
      // Fetch data from the API 
      const response = await fetch(url + userInp);
      const data = await response.json();

      // Get the first meal from the API response
      const myMeal = data.meals[0];
      console.log(myMeal);
      console.log(myMeal.strMealThumb);
      console.log(myMeal.strMeal);
      console.log(myMeal.strArea);
      console.log(myMeal.strInstructions);

      // Prepare the list of ingredients
      let count = 1;
      let ingredients = [];
      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal[`strMeasure` + count];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      console.log(ingredients);

      // Update the result element with the meal details
      result.innerHTML = `
        <img src=${myMeal.strMealThumb}>
        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
      `;

      // Create the list of ingredients
      const ingredientCon = document.getElementById("ingredient-con");
      const parent = document.createElement("ul");
      ingredients.forEach((i) => {
        const child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
      });
      ingredientCon.appendChild(parent);

      // Add event listeners for hiding and showing the recipe
      const recipe = document.getElementById("recipe");
      const hideRecipe = document.getElementById("hide-recipe");
      const showRecipe = document.getElementById("show-recipe");
      hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
      });
      showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
      });
    } catch (error) {
      // Handle errors and display a message
      result.innerHTML = `<h3>Invalid Input</h3>`;
    }
  }
});


    
