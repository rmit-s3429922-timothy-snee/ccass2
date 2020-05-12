import React, { Component} from 'react';
import ListRecipesService from '../service/ListRecipesService';

class ListRecipes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            message: null
        }
        this.refreshRecipes = this.refreshRecipes.bind(this)
    }

    componentDidMount() {
        this.refreshRecipes();
    }

    refreshRecipes() {
        ListRecipesService.retrieveAllRecipes()
            .then(
                response => {
                    console.log(response)
                    this.setState({recipes:response.data})
                }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>All Recipes</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.recipes.map(
                                    recipe =>
                                        <tr key={recipe.id}>
                                            <td>{recipe.id}</td>
                                            <td>{recipe.recipeName}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListRecipes