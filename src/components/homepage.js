var React = require('react');
var Recipies = require("./recipes");

class HomePage extends React.Component {
    render(){
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>freeCodeCamp's Recipe Box</h1>
                <Recipies />
                <p className='footer'><em>Created by </em><a href="https://github.com/periman2" target="_blank">Periklis Arnaoutis</a></p>
                <p className='footer'><a href="https://github.com/periman2/RecipeBox" target="_blank">Github repository</a></p>
            </div>
        )
    }
}

module.exports = HomePage