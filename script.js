
const Meals = (function() {
    let meals = [];

    const CartMeal = function() {
        return {meal:[], totalCalories: 0}
    };

    return {
        getMeals: function() {
            return meals;
        },
        addMeal: function() {
            const singleMeal = new CartMeal();
            meals.push(singleMeal);
        },
        addIngredient: function(title, calories, allMealContainers) {
            event.preventDefault();
            calories = calories * 1;
            const mealContainer = event.target.parentElement.parentElement.parentElement; 
            const indexMeal = allMealContainers.indexOf(mealContainer);
            meals[indexMeal].meal.push({title, calories})        
        },
        deleteMeal: function(mealContainer, allMealContainers) {
            const index = allMealContainers.indexOf(mealContainer);
            meals.splice(index, 1);
        },
        deleteItem: function(indexMeal, itemIndex) {
            meals[indexMeal].meal.splice(itemIndex, 1);
        },
        clearMeals: function() {
            meals = [];
        },
        totalCalories: function() {
            let totalCalories = 0;
            let calories = 0;
            meals.map(meal => meal.meal)
            .map((meal, index) => {
                meal.map(items => {
                    totalCalories += (items.calories*1);
                    calories += (items.calories*1);                  
                });
                meals[index].totalCalories = calories;
                calories = 0;
            })
            return totalCalories;
        },
        UpdateMeals: function(indexMeal, itemIndex, inputsValue) {
            meals[indexMeal].meal.splice(itemIndex, 1, inputsValue);
        },
    }
})();

const AppStructure = (function() {
    
    return {
        createMeal: function() {
            const html = `
            <div class="meal-container">
            <h2 class="title-meal">Create Meal</h2>
            <button class="btn-close">x</button>
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
        getInputValue: function() {
            const inputTitle = event.target.parentElement.previousElementSibling.children[0].children[1];
            const inputCalories = event.target.parentElement.previousElementSibling.children[1].children[1];
            const title = inputTitle.value;
            const calories = inputCalories.value * 1;
            return {
                title,
                calories
            }
        },
        clearInputs: function() {
            const inputTitle = event.target.parentElement.previousElementSibling.children[0].children[1];
            const inputCalories = event.target.parentElement.previousElementSibling.children[1].children[1];
            inputTitle.value = "";
            inputCalories.value = "";
        },
        displayIngredient: function(title, calories) {
            const html = `
            <li>${title} <span class="item-callories">${calories}</span> <em>Calories </em><i class="fas fa-pencil-alt"></i></li>
            `;
            const ul = event.target.parentElement.parentElement.nextElementSibling.children[1];
            ul.insertAdjacentHTML("beforeend", html);
            return ul
        },
        deleteMealDOM: function(mealContainer) {
            mealContainer.remove();
        },
        clearAppContainer: function(mealContainer) {
            while(mealContainer.firstChild) {
                mealContainer.removeChild(mealContainer.firstChild);
            }
        },
        displayTotalCalories: function(calories) {
            document.querySelector(".totalCalories span").innerText = calories;
        },
        displayMealCalories: function(meals) {
            const spanCalories = [...document.querySelectorAll(".meal-items-title span")];
            meals.forEach((meal, index) => {
                spanCalories[index].innerText = meal.totalCalories;
            }); 
        },
        getMealValue: function() {
            return {
                title: event.target.parentElement.childNodes[0].textContent,
                calories: event.target.parentElement.childNodes[1].textContent
            } 
        },
        updateInputs: function(title, calories) {
            const inputTitle = event.target.closest(".meal-container").children[2].children[0].children[0].children[1];
            const inputCalories = event.target.closest(".meal-container").children[2].children[0].children[1].children[1];
            inputTitle.value = title;
            inputCalories.value = calories;
        },
        showButtons: function() {
            const buttons = [...event.target.closest(".meal-container").children[2].children[1].children];
            buttons.forEach(button => {
                if(button.className == "btn-add") {
                    button.style.display = "none"
                } else {
                    button.style.display = "inline-block"
                }
            });
        },
        hideButtons: function() {
            const buttons = [...event.target.closest(".meal-container").children[2].children[1].children];
            buttons.forEach(button => {
                if(button.className == "btn-add") {
                    button.style.display = "inline-block";
                } else {
                    button.style.display = "none";
                }
            });
        },
        disableEnterKey: function() {
            document.body.addEventListener("keydown", function() {
                if(event.keyCode === 13) {
                    event.preventDefault();
                }
            });  
        },
        
        indexMealContainer: function(allMealContainers) {
            const mealContainer = event.target.closest(".meal-container");
            const index = allMealContainers.indexOf(mealContainer);
            return index;            
        },
        indexItem: function(actualLi, listItem) {
            const index = listItem.indexOf(actualLi);
            return index;            
        },
        deleteLiItem: function(itemIndex, ul) {
            ul.children[itemIndex].remove();
        }
    }
})();

const App = (function(Meals, AppStructure) {
    const appContainer = document.querySelector(".app-container");
    const btnClearAll = document.querySelector(".btn-all");
    let actualLi;
    const addMealCart = function() {
        const btnAddMeal = document.querySelector(".add-another-meal");
        btnAddMeal.addEventListener("click", () => {
            AppStructure.createMeal();
            Meals.addMeal();
        });    
    };
    const deleteAllMeals = function() {
        const allMealContainers = [...document.querySelectorAll(".meal-container")];  
        if(allMealContainers.length) {
            Meals.clearMeals();
            AppStructure.clearAppContainer(appContainer, allMealContainers);
            const totalCalories = Meals.totalCalories();
            AppStructure.displayTotalCalories(totalCalories); 
        }
    };
 
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
            AppStructure.deleteMealDOM(mealContainer);
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
            const listItem = [...event.target.parentElement.parentElement.nextElementSibling.children[1].children];
            const indexMeal = AppStructure.indexMealContainer(allMealContainers);
            const itemIndex = AppStructure.indexItem(actualLi, listItem);
            const inputValues = AppStructure.getInputValue();
            if(inputValues.title && inputValues.calories){
                Meals.UpdateMeals(indexMeal, itemIndex, inputValues);
                const totalCalories = Meals.totalCalories();
                AppStructure.displayTotalCalories(totalCalories);
                const meals = Meals.getMeals();
                AppStructure.displayMealCalories(meals);
                const ul = AppStructure.displayIngredient(inputValues.title, inputValues.calories);
                AppStructure.deleteLiItem(itemIndex, ul);
                AppStructure.clearInputs();
                AppStructure.hideButtons();
            }
        }
        if(event.target.classList.contains("btn-back")) {
            AppStructure.clearInputs();
        }
        if(event.target.classList.contains("btn-delete")) {
            const ul = event.target.parentElement.parentElement.nextElementSibling.children[1];
            const listItem = [...event.target.parentElement.parentElement.nextElementSibling.children[1].children];
            const itemIndex = AppStructure.indexItem(actualLi, listItem);
            AppStructure.deleteLiItem(itemIndex, ul);
            AppStructure.clearInputs();
            const indexMeal = AppStructure.indexMealContainer(allMealContainers);
            Meals.deleteItem(indexMeal, itemIndex);
            AppStructure.hideButtons();
            const totalCalories = Meals.totalCalories();
            AppStructure.displayTotalCalories(totalCalories);
            const meals = Meals.getMeals();
            AppStructure.displayMealCalories(meals);
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