import React, { Component } from 'react';
import MainService from '../service/MainService';

class Greeting extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            data:[]
        }
    }

    componentDidMount() {
        MainService.retrieveUser().then(user => {
            this.setState({data: user.data})
        })
        .catch(err => console.log(err))
    }
    
    render() {

        this.string = <p>Login</p>
        if(this.state.isLoggedIn) {
            this.string = <p>Hello {this.state.data.username}</p>
        }

        return (<>
            <p>{this.string}</p>
            </>
        )
    }
}

export default Greeting