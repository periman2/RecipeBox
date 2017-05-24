var React = require("react");

class AddRecipe extends React.Component {
    constructor(props){
        super(props)
        this.state = {visible: props.visible}
    }
    // handleCloseBtn() {
    //     this.setState({
    //         visible: false
    //     });
    // }
    render() {
        return (
            <div style={{marginTop: '40px'}}>
                <form>
                    <label> Recipe Name
                    <input type='text' name="name"/>
                    </label>
                    <label> Ingredients
                    <input type='text' placeholder="Separetd with coma" name="Ingredients"/>
                    </label>
                    <input type="submit" value="Add Recipe"/>
                    <button onClick={this.props.handleAddBtn}>Close</button>
                </form>
            </div>
        )
    }
}

module.exports = AddRecipe;