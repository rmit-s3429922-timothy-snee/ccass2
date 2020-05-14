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
            <div className="container">
                <h3>User</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.user.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.usernameame}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Main