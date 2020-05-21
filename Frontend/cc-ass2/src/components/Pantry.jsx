import React, { useState, useEffect } from "react";
import { Container, Header, Button, Segment, Form, List} from "semantic-ui-react";
import { useAuth0 } from "../react-auth0-spa";
import PantryService from "../services/PantryService";

function Pantry() {
	const { loading, user } = useAuth0();
	const [state, setState] = useState({
		showAddIngredient: false,
		ingredientToAdd: [],
		weightToAdd: [],
		ingredients:[]
	});

	useEffect(() => {
		function updateIngredients() {
			PantryService.retrievePantryItems(user.nickname)
			.then((response) => {
				setState({...state, ingredients: response.data});
			});
		};

		if(!loading) updateIngredients();
	}, [loading, user]);

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	

	const handleChange = (e, { name, value }) =>
		setState({ ...state, [name]: value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setState({...state, ingredients:[...state.ingredients, state.ingredients.push({"name":state.ingredientToAdd, "weight":state.weightToAdd+"g"})]});
		PantryService.postPantryItems(user.nickname, state.ingredients)
		.then(setState({...state}));
	};

	return (
		<Container>
			<Header>Pantry</Header>
			<Button.Group>
				{!state.showAddIngredient && (
					<Button
						onClick={() => {
							setState({ ...state, showAddIngredient: true });
						}}
					>
						Add Ingredient
					</Button>
				)}
				{state.showAddIngredient && (
					<>
						<Segment>
							<Form onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Input
										onChange={handleChange}
										name="ingredientToAdd"
										value={state.ingredientToAdd}
										label="Ingredient"
										placeholder="Ingredient..."
									></Form.Input>
									<Form.Input
										onChange={handleChange}
										name="weightToAdd"
										value={state.weightToAdd}
										label="Weight (g)"
										placeholder="Weight (g)..."
									></Form.Input>
								</Form.Group>
								<Form.Button type='submit' content="Add"></Form.Button>
								<Button
									onClick={() => {
										setState({ ...state, showAddIngredient: false });
									}}
								>
									Hide
								</Button>
							</Form>
						</Segment>
					</>
				)}
			</Button.Group>
			<Segment>
			<Header>Your ingredients</Header>
			<List bulleted>
				{state.ingredients.map((item) => (
					<List.Item>
						{item.weight} {item.name}
					</List.Item>
				))}
			</List>
			</Segment>
		</Container>
	);
}

export default Pantry;
