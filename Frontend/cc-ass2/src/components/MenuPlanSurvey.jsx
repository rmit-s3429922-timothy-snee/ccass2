import React from 'react';
import {Container, Header, Button, Segment} from "semantic-ui-react";

class MenuPlanSurvey extends React.Component{
    state={
        menuSurvey: false
    }
    handleClick =()=>{

    }
    render(){
        return(
            <Container>
                <Header>Survey</Header>
                <Segment>
                    <div>How many days</div>
                        <div>3,5, two</div>
                </Segment>
                <Segment>
                    <div>
                        Choose a plan type
                    </div>
                    <div> weekly, daily</div>
                </Segment>
                <Segment>
                    <div>Any dietary preferences</div>
                    <div>Balanced Diet (Recommended), Low-Carb (Less than 20% of total calories from carbs), Low-Fat (Less than 15% of total calories from fat)</div>
                </Segment>
                <Segment>
                    <div>Any health preferences?</div>
                    <div>
                        Vegan (No meat, poultry, fish, dairy, eggs or honey)
                        Vegetarian (No wheat, can have gluten though)
                        Alcohol-free (No alcohol used or contained)
                        Peanut Free (No peanuts or products containing peanuts)

                    </div>
                </Segment>
                <Segment>
                    <div>Calorie intake</div>
                </Segment>

            </Container>
        )
    }
}


export default MenuPlanSurvey;