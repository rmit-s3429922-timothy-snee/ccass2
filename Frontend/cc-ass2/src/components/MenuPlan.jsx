import React from 'react';
import {Container, Header, Button, Segment, Tab} from "semantic-ui-react";
import MenuPlanSurvey from "./MenuPlanSurvey";

class MenuPlan extends React.Component {
    state = {
        menuSurvey: false,
        menuPlan: ''
    }
    handleClick = () => {
        this.setState({menuSurvey: !this.state.menuSurvey})
    }
    setMenuPlan = (menuPlan) => {
        this.setState({menuPlan})
    }

    render() {
        const panes = this.state.menuPlan ? this.state.menuPlan.map(
            (menu) => (
                {
                    menuItem: `Day ${this.state.menuPlan.indexOf(menu) +1 }`,
                    render: () => <Tab.Pane>Day {this.state.menuPlan.indexOf(menu) +1}
                        <div>
                            Breakfast:{menu.Breakfast.recipe.label}
                        </div>
                        <div>
                            Lunch:{menu.Lunch.recipe.label}
                        </div>
                        <div>
                            Dinner:{menu.Dinner.recipe.label}
                        </div>
                    </Tab.Pane>
                }
            )
        ) : console.log("pong")
        return (
            <Container>
                <Header> Menu Plan</Header>
                <Button.Group>
                    <Button onClick={() => {
                        this.handleClick()
                    }}>New menu plan</Button>
                    <Button onClick={() => {
                        console.log(this.state)
                    }}>View menu</Button>
                </Button.Group>
                {this.state.menuSurvey && (
                    <Segment>
                        <MenuPlanSurvey setMenuPlan={this.setMenuPlan}/>
                    </Segment>)}

                {this.state.menuPlan && (<Tab panes={panes}/>)}

            </Container>
        )
    }
}


export default MenuPlan;