import React, { useState } from 'react';
import {Container, Header, Button, List, Segment, Form, Label, Input} from "semantic-ui-react";
import Ingredients from './Ingredients';

class Pantry extends React.Component{
    constructor(props) {
        super(props);

        const ingredients = [
            {name:"Chicken", weight: 200},
            {name:"Pepper", weight: 50}
        ];

        this.state = {
            showAddIngredient: true,
            ingredientToAdd:[],
            weightToAdd:[],
            submittedIngredient:[],
            submittedWeight:[],
            ingredients
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]:value})
    
    handleSubmit = (e) => {
        this.setState({ingredients: [...this.state.ingredients, {name:this.state.ingredientToAdd, weight:this.state.weightToAdd}]})
    }
   
    render(){
        const {ingredientToAdd, weightToAdd} = this.state;
        return(
            <Container>
                <Header>Pantry</Header>
                
                <Button.Group>
                    {!this.state.showAddIngredient && (
                        <Button onClick={()=>{this.setState({showAddIngredient:true})}}>Add Ingredient</Button>
                    )}
                    {this.state.showAddIngredient && (
                            <Button onClick={()=>{this.setState({showAddIngredient:false})}}>Hide</Button>
                    )}
                </Button.Group>
                {
                    this.state.showAddIngredient &&(
                        <Segment>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Input onChange={this.handleChange} name='ingredientToAdd' value={ingredientToAdd} fluid label='Ingredient' placeholder='Ingredient' width={10}></Form.Input>
                                    <Form.Input onChange={this.handleChange} name='weightToAdd' value={weightToAdd} fluid label='Weight (g)' placeholder='Weight (g)' width={6}></Form.Input>
                                </Form.Group>
                                <Form.Button content='Add'></Form.Button>
                            </Form>
                        </Segment>
                    )
                }
                <Ingredients ingredients={this.state.ingredients} />
            </Container>
        )
    }
}

export default Pantry;