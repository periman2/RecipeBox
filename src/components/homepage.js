var React = require('react');
var Recipies = require("./recipes");
var Popup = require("./popup")

class HomePage extends React.Component {
    render(){
        return (
            <div>
                <Recipies />
                <Popup />
            </div>
            
        )
    }
}

module.exports = HomePage