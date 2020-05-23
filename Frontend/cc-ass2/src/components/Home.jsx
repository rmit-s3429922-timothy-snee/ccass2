import React, {useEffect, useState} from 'react';
import {Button, Container, Dimmer, Header, Image, Input, Loader, Placeholder, Segment} from "semantic-ui-react";
import {getRecipe} from "../services/GetRecipes";
import {useAuth0} from "../react-auth0-spa";
import MenuPlanService from "../services/MenuPlanService";
import PantryService from "../services/PantryService";
import RecipeList from "./RecipeList";

function Home() {
    const {isAuthenticated, user} = useAuth0();
    const [state, setState] = useState({
        recipeSearch: "",
        recipeResult: {},
        loading: false,
        loaded: false,
        newRecipes:{}
    })



    const handleChange = (value) => {
        setState({recipeSearch: value});
    }

    const handleClick = async () => {
        setState({loading: true})
        const recipe = await getRecipe(state.recipeSearch)
        if(recipe.length>0){
            const recipeResult = {
                label: recipe[0].recipe.label,
                source: recipe[0].recipe.source,
                image: recipe[0].recipe.image,
                url: recipe[0].recipe.url,
                calories: recipe[0].recipe.calories,
                yield: recipe[0].recipe.yield
            }
            setState({recipeResult, loading: false, loaded: true})
        }else{
            setState({loading:false})
        }

    }

    const handleSave = ()=>{
        MenuPlanService.addRecipe(user.nickname, state.recipeResult)
    }


    return (
        <Container>
            {user && (<RecipeList username={user.nickname}/>)}
            <Header>Recipe Search</Header>
            <Input type='text' value={state.recipeSearch} onChange={(event, {value}) => {
                return handleChange(value)
            }}></Input>
            <Button onClick={() => {
                handleClick()
            }}>search</Button>
            {!state.loaded && state.loading && (
                <Segment>
                    <Dimmer active={state.loading}>
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
            {state.loaded && (
                <Segment>
                    <Dimmer active={state.loading}>
                        <Loader indeterminate>Loading...</Loader>
                    </Dimmer>
                    {state.loading ?
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
                            src={state.recipeResult.image}
                            size='medium' centered/>}
                    {state.loading ? <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line/>
                            </Placeholder.Header>
                        </Placeholder> :
                        <Header textAlign={"center"}>{state.recipeResult.label}</Header>}
                    <Button.Group>
                        {isAuthenticated &&(<Button primary onClick={() => {
                            handleSave()
                        }}> Save</Button>)}
                        <a href={state.recipeResult.url} target="_blank"><Button>Go to recipe</Button></a>
                    </Button.Group>
                </Segment>)}
        </Container>
    )


}

export default Home;