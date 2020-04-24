
const Meals = (function() {
   let meals = [
       
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
        addIngredient: function(title, calories, allMealContainers) {
            event.preventDefault();
            calories = calories * 1;
            const mealContainer = event.target.parentElement.parentElement.parentElement; 
            const indexMeal = allMealContainers.indexOf(mealContainer);
            meals[indexMeal].meal.push({title, calories})        
        },
        deleteMeal: function(mealContainer, allMealContainers) {
            let index = allMealContainers.indexOf(mealContainer);
            meals.splice(index, 1);
        },
        //clear meals table
        clearMeals: function() {
            meals = [];
        },
        totalCalories: function() {
            let totalCalories = 0;
            let calories = 0;
            meals.map(meal => meal.meal)
            .map((meal, index) => {
                meal.map(items => {
                    totalCalories += items.calories;
                    calories += items.calories;                  
                })
                meals[index].totalCalories = calories;
                calories = 0;
            })
            return totalCalories
        },
        //replacing update item in table
        UpdateMeals: function(indexMeal, itemIndex) {
            console.log(meals[indexMeal].meal);
            meals[indexMeal].meal.splice(indexItem, 1, {})
            
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
            let html = `
            <li>${title} <span class="item-callories">${calories}</span> <em>Calories </em><i class="fas fa-pencil-alt"></i></li>
            `;
            const ul = event.target.parentElement.parentElement.nextElementSibling.children[1];
            ul.innerHTML += html;
        },
        //delete meal container from DOM
        deleteMealDOM: function(mealContainer) {
            mealContainer.remove();
        },
        //clear app-container
        clearAppContainer: function(mealContainer) {
            while(mealContainer.firstChild) {
                mealContainer.removeChild(mealContainer.firstChild);
            }
        },
        //display total calories
        displayTotalCalories: function(calories) {
            document.querySelector(".totalCalories span").innerText = calories;
        },
        //display meal calories on cart
        displayMealCalories: function(meals) {
            const spanCalories = [...document.querySelectorAll(".meal-items-title span")];
            meals.forEach((meal, index) => {
                spanCalories[index].innerText = meal.totalCalories;
            }) 
        },
        //get title and calories value
        getMealValue: function() {
            return {
                title: event.target.parentElement.childNodes[0].textContent,
                calories: event.target.parentElement.childNodes[1].textContent
            } 
        },
        //put back meal value to inputs
        updateInputs: function(title, calories) {
            const inputTitle = event.target.closest(".meal-container").children[2].children[0].children[0].children[1];
            const inputCalories = event.target.closest(".meal-container").children[2].children[0].children[1].children[1];
            inputTitle.value = title;
            inputCalories.value = calories;
        },
        //hide button add, show other buttons
        showButtons: function() {
            const buttons = [...event.target.closest(".meal-container").children[2].children[1].children];
            buttons.forEach(button => {
                if(button.className == "btn-add") {
                    button.style.display = "none"
                } else {
                    button.style.display = "inline-block"
                }
            })
        },
        //disable enter key
        disableEnterKey: function() {
            document.body.addEventListener("keydown", function() {
                if(event.keyCode === 13) {
                    event.preventDefault();
                }
            })  
        },
        indexMealContainer: function(allMealContainers) {
            mealContainer = event.target.closest(".meal-container");
            const index = allMealContainers.indexOf(mealContainer);
            return index;            
        },
        indexItem: function(actualLi){
            const listItem = [...event.target.parentElement.parentElement.nextElementSibling.children[1].children];
            const index = listItem.indexOf(actualLi);
            return index;            
        }
    }

})();



const App = (function(Meals, AppStructure) {
    const appContainer = document.querySelector(".app-container");
    const btnClearAll = document.querySelector(".btn-all");
    let actualLi;
    //listen to addMeal btn
    const addMealCart = function() {
        const btnAddMeal = document.querySelector(".add-another-meal");
        btnAddMeal.addEventListener("click", () => {
            AppStructure.createMeal();
            Meals.addMeal();
        });    
    }
    //delete all meals
    const deleteAllMeals = function() {
        const allMealContainers = [...document.querySelectorAll(".meal-container")];  
        if(allMealContainers.length) {
            Meals.clearMeals();
            AppStructure.clearAppContainer(appContainer, allMealContainers);
            const totalCalories = Meals.totalCalories();
            AppStructure.displayTotalCalories(totalCalories); 
        }
    }
 
    const eventListener = function() {
        event.preventDefault();
        const allMealContainers = [...document.querySelectorAll(".meal-container")]; 
        if(event.target.classList.contains("btn-add")) {
            const inputsValue = AppStructure.getInputValue();
            const {title, calories} = inputsValue;
            if(inputsValue.title && inputsValue.calories) {
                Meals.addIngredient(title, calories, allMealContainers);
                AppStructure.displayIngredient(title, calories);
                AppStructure.clearInputs();
                const totalCalories = Meals.totalCalories();
                AppStructure.displayTotalCalories(totalCalories); 
                const meals = Meals.getMeals();
                AppStructure.displayMealCalories(meals);
            }  
        }  
        if(event.target.classList.contains("btn-close")) {
            const mealContainer = event.target.parentElement;
            //delete meal container form DOM
            AppStructure.deleteMealDOM(mealContainer);
            //delete meal from array meals
            Meals.deleteMeal(mealContainer, allMealContainers); 
            const totalCalories = Meals.totalCalories();
            AppStructure.displayTotalCalories(totalCalories);  
        }
        if(event.target.classList.contains("fa-pencil-alt")) {
            const mealValue = AppStructure.getMealValue();
            AppStructure.updateInputs(mealValue.title, mealValue.calories);
            AppStructure.showButtons();   
            AppStructure.disableEnterKey();    
            actualLi = event.target.parentElement;     
        }
        if(event.target.classList.contains("btn-update")) {
            const indexMeal = AppStructure.indexMealContainer(allMealContainers)
            const itemIndex = AppStructure.indexItem(actualLi);
            Meals.UpdateMeals(indexMeal, itemIndex);
        }
    }
    return {
        init: function(){
            addMealCart();
            appContainer.addEventListener("click", eventListener);   
            btnClearAll.addEventListener("click", deleteAllMeals);
        }
    }
    
})(Meals, AppStructure);

App.init()