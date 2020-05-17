import React from 'react';
import {Container, Header, Button, List, Segment, Form, Label, Input} from "semantic-ui-react";

class Ingredients extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return( <>
            <Header>Your ingredients</Header>
            <List bulleted>
                {this.props.ingredients.map(item => (
                    <List.Item key={item}>{item.weight}g {item.name}</List.Item>
                ))}
            </List>
            </>
        )
    }
}

export default Ingredients;