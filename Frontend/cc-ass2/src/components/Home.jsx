import React from 'react';
import {Button, Container, Header, Image, Input, Segment} from "semantic-ui-react";
import {getRecipe} from "../services/GetRecipes";

class Home extends React.Component {
    state = {
        recipeSearch: "",
        recipeResult: {}

    }

    handleChange(value) {
        this.setState({recipeSearch: value});
    }

    handleClick = async () => {
        const recipe = await getRecipe(this.state.recipeSearch)

        const recipeResult = {
            title: recipe[0].recipe.label,
            source: recipe[0].recipe.source,
            image: recipe[0].recipe.image,
            url: recipe[0].recipe.url
        }
        console.log(recipe)
        console.log(recipeResult)
        this.setState({recipeResult})
    }

    render() {
        return (
            <Container>
                <Header>Recipe Search</Header>
                <Input type='text' value={this.state.recipeSearch} onChange={(event, {value}) => {
                    return this.handleChange(value)
                }}></Input>
                <Button onClick={() => {this.handleClick()}}>search</Button>
                {this.state.recipeResult.title && (
                    <Segment>
                        <Image src={this.state.recipeResult.image} size='medium' centered />
                        <Header>{this.state.recipeResult.title}</Header>
                </Segment>)}
            </Container>
        )

    }
}

export default Home;