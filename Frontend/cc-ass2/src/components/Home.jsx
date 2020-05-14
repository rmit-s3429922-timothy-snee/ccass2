import React from 'react';
import {Button, Container, Dimmer, Header, Image, Input, Loader, Placeholder, Segment} from "semantic-ui-react";
import {getRecipe} from "../services/GetRecipes";

class Home extends React.Component {
    state = {
        recipeSearch: "",
        recipeResult: {},
        loading: false
    }

    handleChange(value) {
        this.setState({recipeSearch: value});
    }

    handleClick = async () => {
        this.setState({loading: true})
        const recipe = await getRecipe(this.state.recipeSearch)

        const recipeResult = {
            title: recipe[0].recipe.label,
            source: recipe[0].recipe.source,
            image: recipe[0].recipe.image,
            url: recipe[0].recipe.url
        }
        this.setState({recipeResult, loading: false})
    }

    render() {
        return (
            <Container>
                <Header>Recipe Search</Header>
                <Input type='text' value={this.state.recipeSearch} onChange={(event, {value}) => {
                    return this.handleChange(value)
                }}></Input>
                <Button onClick={() => {
                    this.handleClick()
                }}>search</Button>
                {!this.state.recipeResult.title && this.state.loading && (
                    <Segment>
                        <Dimmer active={this.state.loading}>
                            <Loader indeterminate>Preparing Files</Loader>
                        </Dimmer>

                        <Placeholder style={{
                            height: 300,
                            width: 300,
                            display: 'block',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        }}>
                            <Placeholder.Image/>
                        </Placeholder>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line/>
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                )}
                {this.state.recipeResult.title && (
                    <Segment>
                        <Dimmer active={this.state.loading}>
                            <Loader indeterminate>Preparing Files</Loader>
                        </Dimmer>
                        {this.state.loading ?
                            <Placeholder style={{
                                height: 300,
                                width: 300,
                                display: 'block',
                                'margin-left': 'auto',
                                'margin-right': 'auto'
                            }}>
                                <Placeholder.Image/>
                            </Placeholder> :
                            <Image
                                src={this.state.recipeResult.image}
                                size='medium' centered/>}
                        {this.state.loading ? <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line/>
                                </Placeholder.Header>
                            </Placeholder> :
                            <Header textAlign={"center"}>{this.state.recipeResult.title}</Header>}
                            <Button.Group>
                                <Button primary> Save</Button>
                                <a href={this.state.recipeResult.url}><Button>Go to recipe</Button></a>
                            </Button.Group>
                    </Segment>)}
            </Container>
        )

    }
}

export default Home;