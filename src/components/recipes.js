var React = require("react");

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
            this.state = {recipies: JSON.parse(localStorage.getItem("recipies"))};
        } else {
            this.state = {recipies: recipies};
            localStorage.setItem("recipies", JSON.stringify(recipies))
        }
    }
    handleVisibility() {

    }
    render() {
        var allrecipies = this.state.recipies;
        var keys = Object.keys(allrecipies);
        var recipies = [];
        for (var i = 0; i < keys.length; i ++){
            if(this.state[i].visibleIng){
                var ingredients = <ul>{allrecipies[i].ingredients.map(returnIng)}</ul>
            }
            recipies.push(
                <div key={i} className="recipe">
                    <h3 onClick={this.handleVisibility}>{allrecipies[i].name}</h3>
                    {ingredients}
                </div>
            )
        }
        return (
            <div>
                <ul>
                 {recipies}
                </ul>
            </div>
        )
    }
}

function returnIng(ing, i){
    return <li key={i}>{ing}</li>
}

module.exports = Recipies;