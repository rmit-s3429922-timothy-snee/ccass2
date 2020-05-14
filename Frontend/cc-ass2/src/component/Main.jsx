import React, { Component } from 'react';
import MainService from '../service/MainService';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            message: null
        }
        this.refreshUser = this.refreshUser.bind(this)

    }

    componentDidMount() {
        this.refreshUser();
    }

    refreshUser() {
        MainService.retrieveUser()
            .then(
                response => {
                    console.log(response)
                    this.setState({user:response.data})
                }
            )
    }
    
    render() {
		return (
            <ul>
                {this.state.user.map(user => (<li>{user.username}</li>))}
            </ul>
        );
    }
}

export default Main