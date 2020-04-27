
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
        addIngredient: function(title, calories, allMealContainers, mealContainer) {
            event.preventDefault();
            calories = calories * 1;
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
        getInputValue: function(inputTitle, inputCalories) { 
            const title = inputTitle.value;
            const calories = inputCalories.value * 1;
            return {
                title,
                calories
            }
        },
        clearInputs: function(inputTitle, inputCalories) {
            inputTitle.value = "";
            inputCalories.value = "";
        },
        updateInputs: function(title, calories, inputTitle, inputCalories) {
            inputTitle.value = title;
            inputCalories.value = calories;
        },
        displayIngredient: function(title, calories, ul) {
            const html = `
            <li>${title} <span class="item-callories">${calories}</span> <em>Calories </em><i class="fas fa-pencil-alt"></i></li>
            `;
            ul.insertAdjacentHTML("beforeend", html);
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
                calories: event.target.parentElement.childNodes[1].textContent,
            } 
        },
        showButtons: function(buttons) {
            buttons.forEach(button => {
                if(button.className == "btn-add") {
                    button.style.display = "none"
                } else {
                    button.style.display = "inline-block"
                }
            });
        },
        hideButtons: function(buttons) {
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
        indexMealContainer: function(allMealContainers, mealContainer) {
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
    const {createMeal, clearAppContainer, displayTotalCalories, getInputValue, displayIngredient, clearInputs, displayMealCalories,
         deleteMealDOM, getMealValue, updateInputs, showButtons, hideButtons, disableEnterKey, indexMealContainer, indexItem, deleteLiItem} = AppStructure
    const {addMeal, clearMeals, totalCalories, addIngredient, getMeals, deleteMeal, UpdateMeals, deleteItem} = Meals;
    const appContainer = document.querySelector(".app-container");
    const btnClearAll = document.querySelector(".btn-all");
    let actualLi;
    const addMealCart = function() {
        const btnAddMeal = document.querySelector(".add-another-meal");
        btnAddMeal.addEventListener("click", () => { 
            createMeal();
            addMeal();
        });    
    };
    const deleteAllMeals = function() {
        const allMealContainers = [...document.querySelectorAll(".meal-container")];  
        if(allMealContainers.length) {
            clearMeals();
            clearAppContainer(appContainer, allMealContainers);
            const totalCalorie = totalCalories();
            displayTotalCalories(totalCalorie); 
        }
    };
 
    const eventListener = function() {
        event.preventDefault();
        if(event.target.classList.contains("app-container")) return;
        const allMealContainers = [...document.querySelectorAll(".meal-container")]; 
        const buttons = [...event.target.closest(".meal-container").children[2].children[1].children];
        const inputTitle = event.target.closest(".meal-container").children[2].children[0].children[0].children[1];
        const inputCalories = event.target.closest(".meal-container").children[2].children[0].children[1].children[1];
        const mealContainer = event.target.closest(".meal-container");
        const ul = event.target.closest(".meal-container").children[3].children[1];
        
            if(event.target.classList.contains("btn-add")) {
                const inputsValue = getInputValue(inputTitle, inputCalories);
                const {title, calories} = inputsValue;
                if(title && calories && calories > 0) {
                    addIngredient(title, calories, allMealContainers, mealContainer);
                    displayIngredient(title, calories, ul);
                    clearInputs(inputTitle, inputCalories);
                    const totalCalorie = totalCalories();
                    displayTotalCalories(totalCalorie); 
                    const meals = getMeals();
                    displayMealCalories(meals);
                }  
            }  
            if(event.target.classList.contains("btn-close")) {
                deleteMealDOM(mealContainer);
                deleteMeal(mealContainer, allMealContainers); 
                const totalCalorie = totalCalories();
                displayTotalCalories(totalCalorie);  
            }
            if(event.target.classList.contains("fa-pencil-alt")) {
                const mealValue = getMealValue();
                updateInputs(mealValue.title, mealValue.calories, inputTitle, inputCalories);
                showButtons(buttons);   
                disableEnterKey();    
                actualLi = event.target.parentElement;     
            }
            if(event.target.classList.contains("btn-update")) {
                const listItem = [...event.target.parentElement.parentElement.nextElementSibling.children[1].children];
                const indexMeal = indexMealContainer(allMealContainers, mealContainer);
                const itemIndex = indexItem(actualLi, listItem);
                const inputValues = getInputValue(inputTitle, inputCalories);
                if(inputValues.title && inputValues.calories){
                    UpdateMeals(indexMeal, itemIndex, inputValues);
                    const totalCalorie = totalCalories();
                    displayTotalCalories(totalCalorie);
                    const meals = getMeals();
                    displayMealCalories(meals);
                    displayIngredient(inputValues.title, inputValues.calories, ul);
                    deleteLiItem(itemIndex, ul);
                    clearInputs(inputTitle, inputCalories);
                    hideButtons(buttons);
                }
            }
            if(event.target.classList.contains("btn-back")) {
                clearInputs(inputTitle, inputCalories);
            }
            if(event.target.classList.contains("btn-delete")) {
                const ul = event.target.parentElement.parentElement.nextElementSibling.children[1];
                const listItem = [...event.target.parentElement.parentElement.nextElementSibling.children[1].children];
                const itemIndex = indexItem(actualLi, listItem);
                deleteLiItem(itemIndex, ul);
                clearInputs(inputTitle, inputCalories);
                const indexMeal = indexMealContainer(allMealContainers, mealContainer);
                deleteItem(indexMeal, itemIndex);
                hideButtons(buttons);
                const totalCalorie = totalCalories();
                displayTotalCalories(totalCalorie);
                const meals = getMeals();
                displayMealCalories(meals);
            }
    }
    return {
        init: function() {
            addMealCart();
            appContainer.addEventListener("click", eventListener);   
            btnClearAll.addEventListener("click", deleteAllMeals);
        }
    } 
})(Meals, AppStructure);

App.init()