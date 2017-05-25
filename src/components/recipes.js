var React = require("react");
var AddRecipe = require("./addrecipe");
var EditRecipe = require("./editrecipe");

var myrecipes = {
    0: {
        name: "Wilted spinach with yoghurt & raisins", 
        ingredients: ["300 g frozen spinach" , "1 small clove of garlic", "500 g Greek yoghurt", "sunflower oil", "40 g raisins", "extra virgin olive oil"],
        execution: "Place the spinach in a saucepan with a few tablespoons of water and cook over a medium heat for a few minutes, or until defrosted (if using frozen) and just cooked. Take off the heat and leave to cool.\nPeel and crush the garlic and mix with the yoghurt, ¾ of a teaspoon of sea salt and a generous grind of black pepper. Stir in the cooled spinach.\nHeat 1 tablespoon of sunflower oil in a small pan and fry the raisins for 1 to 2 minutes, or until starting to plump up.\nScatter over the spinach and finish with a drizzle of extra virgin olive oil just before serving.",
        visibleIng: false
    },
    1: {
        name: "Baked squash", 
        ingredients: ["1 butternut squash" , "olive oil", "1 red onion", "1 clove of garlic","1 bunch of fresh sage , (30g)","1 clove of garlic","10 sun-dried tomatoes","75 g vac-packed chestnuts","75 g basmati rice","75 g dried cranberries","1 pinch of ground allspice","red wine"],
        execution: "Preheat the oven to 180°C/350°F/gas 4. Wash the squash, carefully cut it in half lengthways, then remove and reserve the seeds. Use a spoon to score and scoop some flesh out, making a gully for the stuffing all along the length of the squash. Finely chop the scooped-out flesh with the seeds and put into a frying pan on a medium heat with 2 tablespoons of oil. Peel, finely chop and add the onion and garlic, stirring regularly while you pick the sage leaves and finely chop them with the sun-dried tomatoes and chestnuts. Stir into the pan with the rice, cranberries and allspice, add a good pinch of sea salt and black pepper and a swig of red wine, and mix well. Fry for 10 minutes, or until softened, stirring occasionally.\nPack the mixture tightly into the gully in the two squash halves, then press the halves firmly back together. Rub the skin of the squash with a little oil, salt and pepper, and if you’ve got them, pat on any extra herb leaves you have to hand. Place the squash in the centre of a double layer of tin foil, then tightly wrap it up. Bake for around 2 hours, or until soft and cooked through.\nOnce ready, take the squash to the table and open up the foil in front of everyone, then carve into nice thick slices and serve with all the usual trimmings.",
        visibleIng: false
    }
}

class Recipes extends React.Component {
    constructor(props){
        super(props);
        if(localStorage.getItem("recipes")!==null) {
            var updatedrecipes = JSON.parse(localStorage.getItem("recipes"));
            var newrecipes = {};
            for(var i in updatedrecipes){
                newrecipes[i] = updatedrecipes[i];
                newrecipes[i].visibleIng = false;
            }
            this.state = {recipes: newrecipes, addVisible: false, editVisible: false, indexEdited: null, indexShowed: null};
        } else {
            this.state = {recipes: myrecipes, addVisible: false, indexEdited: null, indexShowed: null};
            localStorage.setItem("recipes", JSON.stringify(myrecipes))
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
            var prevIndex = prevState.indexShowed;
            // console.log("prev", prevIndex, "index", index);
            state.indexShowed = index;
            if(prevIndex && (prevIndex !== index)){
                console.log("I'm in here");
                state.recipes[prevIndex].visibleIng = (!prevState.recipes[prevIndex].visibleIng);
            } else if(prevIndex === index){
                state.indexShowed = null;
            }
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
            return {editVisible: !prevState.editVisible, recipes: prevState.recipes, indexEdited: index}
        })
    }
    handleAddFormSubmit(event){
        event.preventDefault();
        var name = event.target.childNodes[0].lastChild.value;
        var ingredients = event.target.childNodes[1].lastChild.value.split(",");
        var execution = event.target.childNodes[2].lastChild.value;
        this.createRecipe(name, ingredients, execution);
        this.handleAddBtn();
    }
    handleEditFormSubmit(event){
        event.preventDefault();
        console.log(event.target)
        var name = event.target.childNodes[0].lastChild.value;
        var ingredients = event.target.childNodes[1].lastChild.value.split(",");
        var execution = event.target.childNodes[2].lastChild.value;
        var recipes = this.state.recipes;
        recipes[this.state.indexEdited].name = name;
        recipes[this.state.indexEdited].ingredients= ingredients;
        recipes[this.state.indexEdited].execution= execution;
        localStorage.setItem("recipes", JSON.stringify(recipes));
        this.setState({
            recipes: recipes, editVisible: false
        })
        
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
                newrecipes[count] = recipes[key];
                count ++;
            }
            localStorage.setItem("recipes", JSON.stringify(newrecipes))
            return {recipes: newrecipes, addVisible: false, indexShowed: null};
        });
    }
    render() {
        console.log(this.state.recipes);
        var allrecipes = this.state.recipes;
        var keys = Object.keys(allrecipes);
        var recipes = [];
        // console.log(this.state);
        for (var i = 0; i < keys.length; i ++){
            // console.log(allrecipes[i]);
            var details = null;
            if(this.state.recipes[i].visibleIng){
                details = <div className='details'>
                    <h4>Ingredients</h4>
                    <ul>{allrecipes[i].ingredients.map(returnIng)}</ul>
                    <h4>Instructions</h4>
                    <p className="execution">{allrecipes[i].execution}</p>
                    <button value={i} onClick={this.handleRecipeDelete}>Delete</button>
                    <button value={i} onClick={this.handleEditBtn}>Edit</button>
                    </div>;
            }
            recipes.push(
                <div key={i} className="recipe">
                    <h3 value={i} onClick={this.handleVisibility}>{allrecipes[i].name}</h3>
                    <hr />
                    {details}
                </div>
            )
        }
        return (
            <div className='recipes'>
                <h2><em>Recipes</em></h2>
                <ul className='list'>
                 {recipes}
                </ul>
                <button onClick={this.handleAddBtn}>Add Recipe</button>
                {this.state.addVisible && <AddRecipe onSubmitForm={this.handleAddFormSubmit} onClose={this.handleAddBtn} />}
                {this.state.editVisible && <EditRecipe recipe={this.state.recipes[this.state.indexEdited]} onSubmitEditForm={this.handleEditFormSubmit} onClose={this.handleEditBtn} />}
            </div>
        )
    }
}

function returnIng(ing, i){
    return <li key={i}>{ing}</li>
}

module.exports = Recipes;