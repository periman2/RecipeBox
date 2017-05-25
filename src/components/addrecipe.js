var React = require("react");

class AddRecipe extends React.Component {
    render() {
        return (
        <div className='popup'>
            <form onSubmit={this.props.onSubmitForm}>
                <label><br /> <p>Recipe Name</p>
                <input type='text' name="nameAdd" required/>
                </label>
                <label><br /> <p>Ingredients</p>
                <textarea placeholder="Separated with commas." name="IngredientsAdd" required/>
                </label>
                <label><br /> <p>Instructions</p>
                <textarea name="ExecutionAdd" required/>
                </label><br />
                <input type="submit" value="Submit Recipe"/><br />
                <button onClick={this.props.onClose}>Close</button>
            </form>
        </div>
        )
    }
}

module.exports = AddRecipe;