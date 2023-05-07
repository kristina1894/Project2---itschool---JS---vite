// i let my console logs during project in comments
//creating the result and button elements
const result = document.getElementById("result")
const searchBtn = document.getElementById("search-btn")
// declaring api in a variable
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
//const url =`${import.meta.env.VITE_TMDB_URL}`

//creating the event listener for the search button
searchBtn.addEventListener("click",()=>{
  const userInput = document.getElementById("user-input").value
//creating a condition in case of pressing search with no text introduced
  if(userInput.length==0){
    result.innerHTML=`<h3>This Field Cannot Be Empty</h3>`
  }
  //if the text is introduced then fetching the url
  else{
    fetch(url + userInput)
  .then((response) => response.json())
  .then((data) => {
    let myMeal = data.meals[0]
    console.log(myMeal)
    console.log(myMeal.strMeal)
    console.log(myMeal.strArea)
    console.log(myMeal.strInstructions)
    let count = 1
    let ingredients = []

    // browsing the data with a for in order to populate the food recipe with their ingredients and measures
    for (let i in myMeal) {
      let ingredient = ""
      let measure = ""
      if (i.startsWith("strIngredient" && myMeal[i])) {
        ingredient = myMeal[`strIngredient` + count] 
        measure = myMeal[`strMeasure` + count]
        count += 1
        ingredients.push(`${measure} ${ingredient}`)
      }
    }
   console.log(ingredients)
   //displaying the results for food picture and ingredients + buttons for showing and hidding the recipe
    result.innerHTML = `<img src=${myMeal.strMealThumb}>
        <div class = "details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe"> 
            <button id="hide-recipe"> X </button>
            <pre id= "instructions">${myMeal.strInstructions} </pre>
        </div>
        <button id="show-recipe">View Recipe</button>`

        let ingredientCon = document.getElementById("ingredient-con")
        let parent = document.createElement("ul")
        let recipe = document.getElementById("recipe")
        let hideRecipe = document.getElementById("hide-recipe")
        let showRecipe = document.getElementById("show-recipe")

        ingredients.forEach((i)=>{
          let child = document.createElement("li")
          child.innerText=i
          parent.appendChild(child)
          ingredientCon.appendChild(parent)


        })
        // event listeners for view recipe and close recipe buttons
        hideRecipe.addEventListener("click",()=>{
        recipe.style.display="none"
        })
        showRecipe.addEventListener("click",()=>{
          recipe.style.display="block"
          })
        
          // javing a catch in case of an invalid input
  }).catch(()=>{
    result.innerHTML=`<h3>Invalid Input!!!</h3>`
  })

  }

})

