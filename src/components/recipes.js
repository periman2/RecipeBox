var React = require("react");
var AddRecipe = require("./addrecipe");
var EditRecipe = require("./editrecipe");

var recipes = {
    0: {
        name: "Pumpkin Puree", 
        ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"],
        execution: "do Stuff",
        visibleIng: false

    },
    1: {
        name: "Spaghetti", 
        ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],
        execution: "do more fucking stuff Stuff",
        visibleIng: false
    }
}

class Recipes extends React.Component {
    constructor(props){
        super(props);
        if(localStorage.getItem("recipes")!==null) {

            this.state = {recipes: JSON.parse(localStorage.getItem("recipes")), addVisible: false, editVisible: false, index: null};
        } else {
            this.state = {recipes: recipes, addVisible: false, index: null};
            localStorage.setItem("recipes", JSON.stringify(recipes))
        }
        this.handleAddBtn = this.handleAddBtn.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
        this.handleEditBtn = this.handleEditBtn.bind(this);
    }
    handleVisibility(event) {
        var index = event.target.getAttribute("value");
        this.setState(function(prevState){
            var state = {};
            state.recipes = prevState.recipes;
            state.recipes[index].visibleIng = (!prevState.recipes[index].visibleIng)
            return state;
        });
    }
    handleAddBtn() {
        this.setState(function(prevState){
            return {addVisible: !prevState.addVisible, recipes: prevState.recipes}
        })
    }
    handleEditBtn(event) {
        var index = event.target.value;
        this.setState(function(prevState){
            return {editVisible: !prevState.editVisible, recipes: prevState.recipes, index: index}
        })
    }
    handleAddFormSubmit(event){
        var name = event.target.childNodes[0].lastChild.value;
        var ingredients = event.target.childNodes[1].lastChild.value.split(",");
        var execution = event.target.childNodes[2].lastChild.value;
        this.createRecipe(name, ingredients, execution);
        this.handleAddBtn();
        event.preventDefault();
    }
    handleEditFormSubmit(event){
        console.log(event.target)
        var name = event.target.childNodes[0].lastChild.value;
        var ingredients = event.target.childNodes[1].lastChild.value.split(",");
        var execution = event.target.childNodes[2].lastChild.value;
        var recipes = this.state.recipes;
        recipes[this.state.index].name = name;
        recipes[this.state.index].ingredients= ingredients;
        recipes[this.state.index].execution= execution;
        localStorage.setItem("recipes", JSON.stringify(recipes));
        this.setState({
            recipes: recipes
        })
        event.preventDefault();
    }
    createRecipe(name, ingredients, execution){
        var newRecipe = {
            name: name,
            ingredients: ingredients,
            execution: execution,
            visibleIng: false
        }
        this.setState(function(prevState){
            var recipes = prevState.recipes;
            var count = Object.keys(recipes).length;
            recipes[count] = newRecipe;
            localStorage.setItem("recipes", JSON.stringify(recipes))
            return {
                recipes: recipes
            }
        })
    }
    handleRecipeDelete(event){
        var index = event.target.getAttribute("value");
        this.setState(function(prevState){
            var recipes = prevState.recipes;
            delete recipes[index];
            var count = 0;
            var newrecipes = {};
            for (var key in recipes){
                console.log(key);
                newrecipes[count] = recipes[key];
                count ++;
            }
            console.log(newrecipes);
            localStorage.setItem("recipes", JSON.stringify(newrecipes))
            return {recipes: newrecipes, addVisible: false};
        });
    }
    render() {
        var allrecipes = this.state.recipes;
        var keys = Object.keys(allrecipes);
        var recipes = [];
        // console.log(this.state);
        for (var i = 0; i < keys.length; i ++){
            // console.log(allrecipes[i]);
            var details = null;
            if(this.state.recipes[i].visibleIng){
                details = <div>
                    <ul>{allrecipes[i].ingredients.map(returnIng)}</ul>
                    <p className="execution">{allrecipes[i].execution}</p>
                    <button value={i} onClick={this.handleRecipeDelete}>Delete</button>
                    <button value={i} onClick={this.handleEditBtn}>Edit</button>
                    </div>;
            }
            recipes.push(
                <div key={i} className="recipe">
                    <h3 value={i} onClick={this.handleVisibility}>{allrecipes[i].name}</h3>
                    {details}
                </div>
            )
        }
        return (
            <div>
                <ul>
                 {recipes}
                </ul>
                <button onClick={this.handleAddBtn}>Add Recipe</button>
                {this.state.addVisible && <AddRecipe onSubmitForm={this.handleAddFormSubmit} onClose={this.handleAddBtn} />}
                {this.state.editVisible && <EditRecipe recipe={this.state.recipes[this.state.index]} onSubmitEditForm={this.handleEditFormSubmit} onClose={this.handleEditBtn} />}
            </div>
        )
    }
}

function returnIng(ing, i){
    return <li key={i}>{ing}</li>
}

module.exports = Recipes;