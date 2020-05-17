import React from 'react';
import {Container, Header, Button, Segment, Tab} from "semantic-ui-react";
import MenuPlanSurvey from "./MenuPlanSurvey";

class MenuPlan extends React.Component{
    state={
        menuSurvey: false,
        menuPlan:''
    }
    handleClick =()=>{
        this.setState({menuSurvey: !this.state.menuSurvey})
    }
    setMenuPlan = (menuPlan)=>{
        this.setState({menuPlan})
        let transformedMenuPlan =[]
        for(let i=0; i< 7; i++){
            let obj ={
                Breakfast: menuPlan.Breakfast[i],
                Lunch: menuPlan.Lunch[i],
                Dinner: menuPlan.Dinner[i]
            }
            transformedMenuPlan.push(obj)
        }
        console.log(transformedMenuPlan)
    }

    render(){
        return(
            <Container>
                <Header> Menu Plan</Header>
                <Button.Group>
                    <Button onClick={()=>{
                        this.handleClick()
                    }}>New menu plan</Button>
                    <Button onClick={()=>{console.log(this.state)}}>View menu</Button>
                </Button.Group>
                {this.state.menuSurvey &&(
                    <Segment>
                        <MenuPlanSurvey setMenuPlan={this.setMenuPlan}/>
                    </Segment>)}

                {this.state.menuPlan &&(<div>THings</div>)}

            </Container>
        )
    }
}


export default MenuPlan;