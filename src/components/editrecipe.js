var React = require("react");

class EditRecipes extends React.Component {
    render() {
        return(
        <div className='popup'>
            <form onSubmit={this.props.onSubmitEditForm}>
                <label><br /> <p>Recipe Name</p>
                <br /><input defaultValue={this.props.recipe.name} type='text' name="nameEdit" required/>
                </label>
                <label><br /> <p>Ingredients</p>
                <br /><textarea defaultValue={this.props.recipe.ingredients} name="IngredientsEdit" required/>
                </label>
                <label><br /> <p>Instructions</p>
                <br /><textarea defaultValue={this.props.recipe.execution} name="ExecutionEdit" required/>
                </label><br />
                <input type="submit" value="Edit Recipe"/>
                <button onClick={this.props.onClose}>Close</button>
            </form>
        </div>
        );
    };
}

module.exports = EditRecipes;