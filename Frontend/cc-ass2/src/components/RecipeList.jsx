import React from 'react';
import {Container, Header, Button, Segment, Tab, Card, Image} from "semantic-ui-react";
import MenuPlanSurvey from "./MenuPlanSurvey";
import MenuPlanService from "../services/MenuPlanService";
import {useAuth0} from "../react-auth0-spa";


class RecipeList extends React.Component {

    state = {
        recipes: []
    }
    componentDidMount = async () => {
        await MenuPlanService.getRecipe(this.props.username)
            .then((response) => {

                if (response.data.length > 0) {

                    this.setState({recipes: response.data})
                }

            })


    }

    render() {
        return (
            <>
                { this.state.recipes.length > 0 ?<Segment>
                    <Card.Group>
                        {
                            (this.state.recipes.map(recipe =>

                                <Card>
                                    <Image src={recipe.image} wrapped ui={false}/>
                                    <Card.Content>
                                        <Card.Header>{recipe.label}</Card.Header>
                                        <Card.Meta>Serves: {recipe.yield}</Card.Meta>
                                        <Card.Description>
                                            Total Calories:{parseInt(recipe.calories)}<br/>
                                            Calories per serve:{parseInt(recipe.calories) / parseInt(recipe.yield)}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a href={recipe.url} target="_blank"><Button>Go to
                                            recipe</Button></a>
                                    </Card.Content>

                                </Card>
                            ))
                        }

                    </Card.Group>
                </Segment>:""}
            </>
        )


    }
}


export default RecipeList;