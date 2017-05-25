var React = require('react');
var Recipies = require("./recipes");

class HomePage extends React.Component {
    render(){
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>freeCodeCamp's Recipe Box</h1>
                <Recipies />
            </div>
        )
    }
}

module.exports = HomePage