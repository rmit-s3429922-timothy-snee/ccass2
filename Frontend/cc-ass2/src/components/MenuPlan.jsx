import React from 'react';
import {Container, Header, Button, Segment} from "semantic-ui-react";
import MenuPlanSurvey from "./MenuPlanSurvey";

class MenuPlan extends React.Component{
    state={
        menuSurvey: false
    }
    handleClick =()=>{
        this.setState({menuSurvey: !this.state.menuSurvey})
    }
    render(){
        return(
            <Container>
                <Header> Menu Plan</Header>
                <Button.Group>
                    <Button onClick={()=>{
                        this.handleClick()
                    }}>New menu plan</Button>
                </Button.Group>
                {this.state.menuSurvey &&(
                    <Segment>
                        <MenuPlanSurvey/>
                    </Segment>)}

            </Container>
        )
    }
}


export default MenuPlan;