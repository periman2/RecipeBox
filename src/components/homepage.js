var React = require('react');
var Recipies = require("./recipes");

class HomePage extends React.Component {
    render(){
        return (
            <div className='recipies'>
                <Recipies />
            </div>
        )
    }
}

module.exports = HomePage