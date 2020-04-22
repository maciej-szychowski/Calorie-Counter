
const Meals = (function() {
   const meals = [
       
    ];

    const CartMeal = function() {
        return {meal:[], totalCalories: 0}
    }

    return {
        getMeals: function() {
            return meals;
        },
        //add meal to table meals
        addMeal: function() {
            const singleMeal = new CartMeal();
            meals.push(singleMeal);
        },
        //add single ingeredient to meal
        addIngredient: function(title, calories) {
            event.preventDefault();
            calories = calories * 1;
            const mealContainer = event.target.parentElement.parentElement.parentElement;
            const allMealContainers = [...document.querySelectorAll(".meal-container")];  
            const indexMeal = allMealContainers.indexOf(mealContainer);
            meals[indexMeal].meal.push({title, calories})   
            console.log(meals);
               
        },
    }
})();

const AppStructure = (function() {
    
    return {
        //create meal cart
        createMeal: function() {
            let html = `
            <div class="meal-container">
            <h2 class="title-meal">Create Meal</h2>
            <button class="btn-close">X</button>
            <form>
                <div class="input-container">
                    <div class="form-input">
                        <label>Meal</label>
                        <input type="text" class="title" placeholder="Add Item">
                    </div>
                    <div class="form-input">
                        <label>Calories</label>
                        <input type="number" class="calories" placeholder="Add Calories">
                    </div>
                </div>
                <div class="buttons">
                    <button class="btn-add">Add Item</button>
                    <button class="btn-update">Update Meal</button>
                    <button class="btn-back">Back</button>
                    <button class="btn-delete">Delete Meal</button>
                </div> 
            </form>
            <div class="meal-items">
                <h3 class="meal-items-title">Total Meal Calories <span>0</span></h3>
                <ul>                
                </ul>
            </div
        </div>
            `;
            document.querySelector(".app-container").innerHTML += html;
        },
          //get inputs value
        getInputValue: function() {
            const inputTitle = event.target.parentElement.previousElementSibling.children[0].children[1];
            const inputCalories = event.target.parentElement.previousElementSibling.children[1].children[1];
            const title = inputTitle.value;
            const calories = inputCalories.value;
            return {
                title,
                calories
            }
        },
        //clear inputs
        clearInputs: function() {
            const inputTitle = event.target.parentElement.previousElementSibling.children[0].children[1];
            const inputCalories = event.target.parentElement.previousElementSibling.children[1].children[1];
            inputTitle.value = "";
            inputCalories.value = "";
        },
        //add single ingredient to meal
        displayIngredient: function(title, calories) {
            console.log(title, calories);
            let html = `
            <li>${title} <span class="item-callories">${calories}</span> <em>Calories </em><i class="fas fa-pencil-alt"></i></li>
            `;
            document.querySelector(".meal-items ul").innerHTML += html;
        }  
    }

})();



const App = (function(Meals, AppStructure) {
    const appContainer = document.querySelector(".app-container");
    //listen to addMeal btn
    const addMealCart = function() {
        const btnAddMeal = document.querySelector(".add-another-meal");
        btnAddMeal.addEventListener("click", () => {
            AppStructure.createMeal();
            Meals.addMeal();
        });    
    }
 

    const eventListener = function() {
        event.preventDefault();
        if(event.target.classList.contains("btn-add")) {
            const inputsValue = AppStructure.getInputValue();
            const {title, calories} = inputsValue;
            if(inputsValue.title || inputsValue.calories) {
                Meals.addIngredient(title, calories);
                AppStructure.displayIngredient(title, calories);


            }  
            AppStructure.clearInputs();
        }  
    }
    return {
        init: function(){
            addMealCart();
            appContainer.addEventListener("click", eventListener);   
        }
    }
    
})(Meals, AppStructure);

App.init()