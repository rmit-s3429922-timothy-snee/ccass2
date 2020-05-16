import React from 'react';
import {Container, Header, Button, Segment, Form} from "semantic-ui-react";

class Login extends React.Component{
    state = { username: '', password: '', submittedUsername: '', submittedPassword: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, password } = this.state

        this.setState({ submittedUsername: username, submittedPassword: password })
    }
    
    render(){
        const { username, password } = this.state
        return(
            <Container>
                <Header>Login</Header>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            placeholder='Username'
                            name='username'
                            value={username}
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            type='password'
                        />
                        <Form.Button content='Submit' />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default Login;