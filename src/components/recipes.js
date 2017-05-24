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
        if(localStorage.getItem("recipies")) {
            this.state = {recipies: JSON.parse(localStorage.getItem("recipies")), addVisible: false};
        } else {
            this.state = {recipies: recipies, addVisible: false};
            localStorage.setItem("recipies", JSON.stringify(recipies))
        }
    }
    handleVisibility(event) {
        var index = event.target.getAttribute("value")
        this.setState(function(prevState){
            var state = {};
            state.recipies = prevState.recipies;
            state.recipies[index].visibleIng = (!prevState.recipies[index].visibleIng)
            return state;
        })
    }
    handleAddBtn() {
        this.setState(function(prevState){
            return {addVisible: !prevState.addVisible, recipies: prevState.recipies}
        })
    }
    render() {
        var allrecipies = this.state.recipies;
        var keys = Object.keys(allrecipies);
        var recipies = [];
        // console.log(this.state);
        for (var i = 0; i < keys.length; i ++){
            console.log(allrecipies[i]);
            var ingredients = null;
            if(this.state.recipies[i].visibleIng){
                ingredients = <ul>{allrecipies[i].ingredients.map(returnIng)}</ul>
            }
            recipies.push(
                <div key={i} className="recipe">
                    <h3 value={i} onClick={this.handleVisibility.bind(this)}>{allrecipies[i].name}</h3>
                    {ingredients}
                </div>
            )
        }
        
        return (
            <div>
                <ul>
                 {recipies}
                </ul>
                <button onClick={this.handleAddBtn.bind(this)}>Add Recipe</button>
                {this.state.addVisible && <AddRecipe visible={this.handleAddBtn.bind(this)} />}
            </div>
        )
    }
}

function returnIng(ing, i){
    return <li key={i}>{ing}</li>
}

module.exports = Recipies;