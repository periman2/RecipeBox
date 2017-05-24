var React = require("react");

class AddRecipe extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div style={{marginTop: '40px'}}>
                <form onSubmit={this.props.onSubmitForm}>
                    <label> Recipe Name
                    <input type='text' name="name" required/>
                    </label>
                    <label> Ingredients
                    <input type='text' placeholder="Separetd with coma" name="Ingredients" required/>
                    </label>
                    <input type="submit" value="Submit Recipe"/>
                    <button onClick={this.props.onClose}>Close</button>
                </form>
            </div>
        )
    }
}

module.exports = AddRecipe;