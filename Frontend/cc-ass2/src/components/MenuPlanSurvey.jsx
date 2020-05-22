import React from 'react';
import {Container, Header, Button, Segment, Input, Checkbox, Item} from "semantic-ui-react";
import {getMenuPlan} from "../services/GetRecipes";

class MenuPlanSurvey extends React.Component {
    state = {
        menuSurvey: false,
        caloriePreference: 'recommended',
        dietaryPreference: 'balanced',
        healthPreferences: {vegan: false, vegetarian: false, noAlcohol: false, noPeanut: false},
        calorie: {
            breakfast: {from: 300, to: 400},
            lunch: {from: 500, to: 700},
            dinner: {from: 500, to: 700}
        }

    }

    handleCaloriePreference = (preference) => {
        this.setState({caloriePreference: preference})
    }
    handleDietaryPreference = (name) => {
        this.setState({dietaryPreference: name})
    }
    handleHealthPreferences = (name) => {
        let healthPreferences = this.state.healthPreferences
        if (name === 'vegan') {
            healthPreferences.vegan = !this.state.healthPreferences.vegan
        }
        if (name === 'vegetarian') {
            healthPreferences.vegetarian = !this.state.healthPreferences.vegetarian
        }
        if (name === 'noAlcohol') {
            healthPreferences.noAlcohol = !this.state.healthPreferences.noAlcohol
        }
        if (name === 'noPeanut') {
            healthPreferences.noPeanut = !this.state.healthPreferences.noPeanut
        }
        this.setState({healthPreferences})
    }
    handleCalorieChange= (meal, range, value)=>{
        if(isNaN(value)){
            return
        }
        value = parseInt(value)
        let caloire = this.state.calorie
        if(meal === 'breakfast')
        {
            if(range==='from'){
                caloire.breakfast.from = value
            }
            if(range==='to'){
                caloire.breakfast.to = value
            }
        }
        if(meal === 'lunch')
        {
            if(range==='from'){
                caloire.lunch.from = value
            }
            if(range==='to'){
                caloire.lunch.to = value
            }
        }
        if(meal === 'dinner')
        {
            if(range==='from'){
                caloire.dinner.from = value
            }
            if(range==='to'){
                caloire.dinner.to = value
            }
        }
        this.setState({caloire})
    }
    handleSubmit=async()=>{
        let data={
            dietaryPreference:this.state.dietaryPreference,
            healthPreferences: this.state.healthPreferences,
            calorie:this.state.calorie
        }
        const menuPlan = await getMenuPlan(data)
        let transformedMenuPlan =[]
        for(let i=0; i< 7; i++){
            let obj ={
                Breakfast: menuPlan.Breakfast[i],
                Lunch: menuPlan.Lunch[i],
                Dinner: menuPlan.Dinner[i]
            }
            transformedMenuPlan.push(obj)
        }
        this.props.setMenuPlan(transformedMenuPlan)


    }

    render() {
        return (
            <Container style={{"text-align":"left"}}>
                <Header>New Menu Plan</Header>
                <Segment>
                    <Header as={'h4'}>Dietary preferences</Header>
                    <div>
                        <Checkbox checked={this.state.dietaryPreference === 'balanced'} onChange={() => {
                            this.handleDietaryPreference('balanced')
                        }}
                                  label='Balanced Diet (Recommended)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.dietaryPreference === 'low-carb'} onChange={() => {
                            this.handleDietaryPreference('low-carb')
                        }} label='Low-Carb (Less than 20% of total calories from carbs)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.dietaryPreference === 'low-fat'} onChange={() => {
                            this.handleDietaryPreference('low-fat')
                        }} label='Low-Fat (Less than 15% of total calories from fat)'/>
                    </div>
                </Segment>
                <Segment>
                    <Header as={'h4'}>Health Preferences</Header>
                    <div>
                        <Checkbox checked={this.state.healthPreferences.vegan} onChange={() => {
                            this.handleHealthPreferences('vegan')
                        }} label='Vegan (No meat, poultry, fish, dairy, eggs or honey)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.healthPreferences.vegetarian} onChange={() => {
                            this.handleHealthPreferences('vegetarian')
                        }} label='Vegetarian (No wheat, can have gluten though)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.healthPreferences.noAlcohol} onChange={() => {
                            this.handleHealthPreferences('noAlcohol')
                        }} label='Alcohol-free (No alcohol used or contained)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.healthPreferences.noPeanut} onChange={() => {
                            this.handleHealthPreferences('noPeanut')
                        }} label='Peanut Free (No peanuts or products containing peanuts)'/>
                    </div>
                </Segment>
                <Segment>
                    <Header as={'h4'}>Calorie intake</Header>
                    <div>
                        <Checkbox checked={this.state.caloriePreference === 'recommended'} onChange={() => {
                            this.handleCaloriePreference('recommended')
                        }}label='Recommended (300-400 calories Breakfast , 500-700 calories Lunch and Dinner)'/>
                    </div>
                    <div>
                        <Checkbox checked={this.state.caloriePreference === 'custom'}  onChange={() => {
                            this.handleCaloriePreference('custom')
                        }}
                                  label='Custom'/>
                    </div>
                    {this.state.caloriePreference ==='custom' && (<Segment>
                        <Header as={'h4'}>Custom Calories</Header>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header as={'h6'}>Breakfast</Item.Header>
                                    <Item.Description>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('breakfast', 'from', value)}} placeholder='from'/>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('breakfast', 'to',value)}} placeholder='to'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content>
                                    <Item.Header as={'h6'}>Lunch</Item.Header>
                                    <Item.Description>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('lunch', 'from', value)}} placeholder='from'/>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('lunch', 'to',value)}} placeholder='to'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content>
                                    <Item.Header as={'h6'}>Dinner</Item.Header>
                                    <Item.Description>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('dinner', 'from', value)}} placeholder='from'/>
                                        <Input onChange={(e,{value})=>{this.handleCalorieChange('dinner', 'to',value)}} placeholder='to'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>)}

                </Segment>
                <Button primary onClick={()=>{this.handleSubmit()}}>Submit</Button>
            </Container>
        )
    }
}


export default MenuPlanSurvey;