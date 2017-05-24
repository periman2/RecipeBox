var React = require('react');
var Recipies = require("./recipes");

class HomePage extends React.Component {
    render(){
        return (
            <div>
                <Recipies />
            </div>
        )
    }
}

module.exports = HomePage