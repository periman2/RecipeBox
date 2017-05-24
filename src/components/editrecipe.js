var React = require("react");

class EditRecipes extends React.Component {
    constructor(props){
        super(props)
        
    }
    render() {
        return(
            <div style={{marginTop: '40px'}}>
                <form onSubmit={this.props.onSubmitEditForm}>
                    <label> Recipe Name
                    <input defaultValue={this.props.recipe.name} type='text' name="name" required/>
                    </label>
                    <label> Ingredients
                    <input defaultValue={this.props.recipe.ingredients} type='text' name="Ingredients" required/>
                    </label>
                    <input type="submit" value="Edit Recipe"/>
                    <button onClick={this.props.onClose}>Close</button>
                </form>
            </div>
        );
    };
}

module.exports = EditRecipes;