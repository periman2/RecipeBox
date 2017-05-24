var React = require("react");
var AddRecipe = require("./addrecipe");

var recipies = {
    0: {
        name: "Pumpkin Puree", 
        ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"],
        visibleIng: false

    },
    1: {
        name: "Spaghetti", 
        ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],
        visibleIng: false
    }
}

class Recipies extends React.Component {
    constructor(props){
        super(props);
        if(localStorage.getItem("recipies")!==null) {

            this.state = {recipies: JSON.parse(localStorage.getItem("recipies")), addVisible: false};
        } else {
            this.state = {recipies: recipies, addVisible: false};
            console.log("here");
            localStorage.setItem("recipies", JSON.stringify(recipies))
        }
        this.handleAddBtn = this.handleAddBtn.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
    }
    handleVisibility(event) {
        var index = event.target.getAttribute("value");
        this.setState(function(prevState){
            var state = {};
            state.recipies = prevState.recipies;
            state.recipies[index].visibleIng = (!prevState.recipies[index].visibleIng)
            return state;
        });
    }
    handleAddBtn() {
        this.setState(function(prevState){
            return {addVisible: !prevState.addVisible, recipies: prevState.recipies}
        })
    }
    handleFormSubmit(event){
        var name = event.target.childNodes[0].lastChild.value;
        var ingredients = event.target.childNodes[1].lastChild.value.split(",");
        console.log(name, ingredients);
        this.createRecipe(name, ingredients);
        this.handleAddBtn();
        event.preventDefault();
    }
    createRecipe(name, ingredients){
        var newRecipe = {
            name: name,
            ingredients: ingredients,
            visibleIng: false
        }
        this.setState(function(prevState){
            var recipies = prevState.recipies;
            var count = Object.keys(recipies).length;
            recipies[count] = newRecipe;
            localStorage.setItem("recipies", JSON.stringify(recipies))
            return {
                recipies: recipies
            }
        })
    }
    handleRecipeDelete(event){
        var index = event.target.getAttribute("value");
        this.setState(function(prevState){
            var recipies = prevState.recipies;
            delete recipies[index];
            var count = 0;
            var newRecipies = {};
            for (var key in recipies){
                console.log(key);
                newRecipies[count] = recipies[key];
                count ++;
            }
            console.log(newRecipies);
            localStorage.setItem("recipies", JSON.stringify(newRecipies))
            return {recipies: newRecipies, addVisible: false};
        })
    }
    render() {
        var allrecipies = this.state.recipies;
        var keys = Object.keys(allrecipies);
        var recipies = [];
        // console.log(this.state);
        for (var i = 0; i < keys.length; i ++){
            // console.log(allrecipies[i]);
            var details = null;
            if(this.state.recipies[i].visibleIng){
                details = <div>
                    <ul>{allrecipies[i].ingredients.map(returnIng)}</ul>
                    <button value={i} onClick={this.handleRecipeDelete}>Delete</button>
                    <button value={i} onClick={this.handleRecipeEdit}>Edit</button>
                    </div>
            }
            recipies.push(
                <div key={i} className="recipe">
                    <h3 value={i} onClick={this.handleVisibility}>{allrecipies[i].name}</h3>
                    {details}
                </div>
            )
        }
        return (
            <div>
                <ul>
                 {recipies}
                </ul>
                <button onClick={this.handleAddBtn}>Add Recipe</button>
                {this.state.addVisible && <AddRecipe onSubmitForm={this.handleFormSubmit} onClose={this.handleAddBtn} />}
            </div>
        )
    }
}

function returnIng(ing, i){
    return <li key={i}>{ing}</li>
}

module.exports = Recipies;