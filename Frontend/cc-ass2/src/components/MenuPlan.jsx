import React from 'react';
import {Container, Header, Button, Segment, Tab, Card, Image} from "semantic-ui-react";
import MenuPlanSurvey from "./MenuPlanSurvey";
import MenuPlanService from "../services/MenuPlanService";
import {useAuth0} from "../react-auth0-spa";


class MenuPlan extends React.Component {

    state = {
        menuSurvey: false,
        menuPlan: '',
        rawMenuPlan:'',
        userMenuPlan: '',
    }
    componentDidMount =  ()=> {
        this.getMenuPlan()
    }


    getMenuPlan = async ()=>{
         await MenuPlanService.getMenuPlan(localStorage.getItem("loggedInUser"))
            .then((response) => {

               if(response.data.length > 0){
                   const list =response.data.map((meal)=>(
                       {
                           Breakfast:meal.breakfast,
                           Lunch: meal.lunch,
                           Dinner:meal.dinner
                       }
                   ))
                   const transFormedList =[]
                   list.forEach((plan)=>{

                       transFormedList.push(this.transformMenuPlan(plan))
                   })
                   this.setState({userMenuPlan: transFormedList[0], menuPlans: transFormedList})
               }

        });

    }

    handleClick = () => {

        this.setState({menuSurvey: !this.state.menuSurvey})
    }
    setMenuPlan = (menuPlan) => {
        let transformedMenuPlan = this.transformMenuPlan(menuPlan)
        this.setState({menuPlan: transformedMenuPlan, rawMenuPlan: menuPlan})
    }
    transformMenuPlan =(menuPlan)=>{
        let transformedMenuPlan =[]

        for(let i=0; i< 7; i++){
            let obj ={
                Breakfast: menuPlan.Breakfast[i],
                Lunch: menuPlan.Lunch[i],
                Dinner: menuPlan.Dinner[i]
            }
            transformedMenuPlan.push(obj)
        }
        return transformedMenuPlan
    }
    handleSubmit = ()=>{
        const breakfast = this.state.rawMenuPlan.Breakfast.map((meal)=> (
            {
                label: meal.recipe.label,
                image: meal.recipe.image,
                url: meal.recipe.url,
                calories: meal.recipe.calories,
                yield: meal.recipe.yield

            }
        ))
        const lunch = this.state.rawMenuPlan.Lunch.map((meal)=> (
            {
                label: meal.recipe.label,
                image: meal.recipe.image,
                url: meal.recipe.url,
                calories: meal.recipe.calories,
                yield: meal.recipe.yield

            }
        ))

        const dinner = this.state.rawMenuPlan.Dinner.map((meal)=> (
            {
                label: meal.recipe.label,
                image: meal.recipe.image,
                url: meal.recipe.url,
                calories: meal.recipe.calories,
                yield: meal.recipe.yield

            }
        ))

        let obj ={
            breakfast: breakfast,
            lunch: lunch,
            dinner: dinner,
        }
        MenuPlanService.postMenuPlan(localStorage.getItem("loggedInUser"), obj)
    }

    render() {
        // const { user } = useAuth0();
        const panes = this.state.menuPlan ? this.state.menuPlan.map(
            (menu) => (
                {

                    menuItem: `Day ${this.state.menuPlan.indexOf(menu) +1 }`,
                    render: () => <Tab.Pane>
                        <Header as={'h3'}>Day {this.state.menuPlan.indexOf(menu) +1}</Header>
                    <Card.Group itemsPerRow={3}>
                        <Card>
                            <Image src={menu.Breakfast.recipe.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Breakfast</Card.Header>

                                <Card.Description>
                                    {menu.Breakfast.recipe.label}
                                    <br/>
                                        Total Calories:{parseInt(menu.Breakfast.recipe.calories)}<br/>
                                        Calories per serve:{ parseInt(menu.Breakfast.recipe.calories)/parseInt(menu.Breakfast.recipe.yield)}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a href={menu.Breakfast.recipe.url} target="_blank"><Button>Go to recipe</Button></a>
                            </Card.Content>

                        </Card>
                        <Card>
                            <Image src={menu.Lunch.recipe.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Lunch</Card.Header>


                                <Card.Description>
                                    {menu.Lunch.recipe.label}
                                    <br/>
                                    Total Calories:{parseInt(menu.Lunch.recipe.calories)}<br/>
                                    Calories per serve:{ parseInt(menu.Lunch.recipe.calories)/parseInt(menu.Lunch.recipe.yield)}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a href={menu.Lunch.recipe.url} target="_blank"><Button>Go to recipe</Button></a>
                            </Card.Content>


                        </Card>
                        <Card>
                            <Image src={menu.Dinner.recipe.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Dinner</Card.Header>


                                <Card.Description>
                                    {menu.Dinner.recipe.label}
                                    <br/>
                                    Total Calories:{parseInt(menu.Dinner.recipe.calories)}<br/>
                                    Calories per serve:{ parseInt(menu.Dinner.recipe.calories)/parseInt(menu.Dinner.recipe.yield)}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a href={menu.Dinner.recipe.url} target="_blank"><Button>Go to recipe</Button></a>
                            </Card.Content>


                        </Card>
                    </Card.Group>
                    </Tab.Pane>
                }
            )
        ) : ""
        const userMenuPlanPanes = this.state.userMenuPlan && (this.state.userMenuPlan.map(
            (menu) => (
                {

                    menuItem: `Day ${this.state.userMenuPlan.indexOf(menu) +1 }`,
                    render: () => <Tab.Pane>
                        <Header as={'h3'}>Day {this.state.userMenuPlan.indexOf(menu) +1}</Header>
                        <Card.Group itemsPerRow={3}>
                            <Card>
                                <Image src={menu.Breakfast.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Breakfast</Card.Header>

                                    <Card.Description>
                                        {menu.Breakfast.label}
                                        <br/>
                                        Total Calories:{parseInt(menu.Breakfast.calories)}<br/>
                                        Calories per serve:{ parseInt(menu.Breakfast.calories)/parseInt(menu.Breakfast.yield)}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a href={menu.Breakfast.url} target="_blank"><Button>Go to recipe</Button></a>
                                </Card.Content>

                            </Card>
                            <Card>
                                <Image src={menu.Lunch.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Lunch</Card.Header>

                                    <Card.Description>
                                        {menu.Lunch.label}
                                        <br/>
                                        Total Calories:{parseInt(menu.Lunch.calories)}<br/>
                                        Calories per serve:{ parseInt(menu.Lunch.calories)/parseInt(menu.Lunch.yield)}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a href={menu.Lunch.url} target="_blank"><Button>Go to recipe</Button></a>
                                </Card.Content>


                            </Card>
                            <Card>
                                <Image src={menu.Dinner.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Dinner</Card.Header>
                                    <Card.Description>
                                        {menu.Dinner.label}
                                        <br/>
                                        Total Calories:{parseInt(menu.Dinner.calories)}<br/>
                                        Calories per serve:{ parseInt(menu.Dinner.calories)/parseInt(menu.Dinner.yield)}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a href={menu.Dinner.url} target="_blank"><Button>Go to recipe</Button></a>
                                </Card.Content>


                            </Card>
                        </Card.Group>
                    </Tab.Pane>
                }
            )
        ))

        return (
            <Container>
                <Header> Menu Plan</Header>
                {this.state.userMenuPlan && (<Segment><Tab panes={userMenuPlanPanes}/>

                </Segment>)}
                <Button onClick={() => {
                    this.handleClick()
                }}>New menu plan</Button>
                {this.state.menuSurvey && (
                    <Segment>
                        <MenuPlanSurvey setMenuPlan={this.setMenuPlan}/>
                    </Segment>)}

                {this.state.menuPlan && (<Segment><Tab panes={panes}/>
                <Button onClick={()=>{this.handleSubmit()}}>Save</Button>
                </Segment>)}

            </Container>
        )
    }
}


export default MenuPlan;