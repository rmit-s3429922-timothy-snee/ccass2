import {getAPIRecipeInfo} from "../data/api";

const getRecipe = (data)=>{
    const { ID, KEY, URL } = getAPIRecipeInfo()
    let queryObj = buildRecipeQuery(data,ID,KEY);
    let promises = [], result = {};

        let str = encodeURI(URL + queryObj);
        promises.push(
            fetch(str)
                .then((res) => res.json())
                .then((data) => {

                    result = data.hits;
                })
                .catch((err) => console.error(err))
        );

    return Promise.all(promises).then(() => {
        return result;
    });
}

const getMenuPlan = (data)=>{
    const { ID, KEY, URL } = getAPIRecipeInfo()
    let queryObj = buildMealPlanQuery(data,ID,KEY);
    let promises = [], result = {};
    for(let key in queryObj){
        let str = encodeURI(URL + queryObj[key]);
        promises.push(
            fetch(str)
                .then((res) => res.json())
                .then((data) => {
                    result[key] = data.hits;
                })
                .catch((err) => console.error(err))
        );
    }
    return Promise.all(promises).then(() => {
        return result;
    });
}

const buildMealPlanQuery =(data, ID,KEY)=>{
    let meals = ['Breakfast', 'Lunch', 'Dinner']
    let queries={}
    let health = getHealthValues(data.healthPreferences)
    meals.forEach((meal)=>{
        let string = meal
        if(meal=== 'Breakfast'){
            let query = `q=${string}&app_id=${ID}&app_key=${KEY}&to=${7}&diet=${data.dietaryPreference}${health}&calories=${data.calorie.breakfast.from}-${data.calorie.breakfast.to}`
            queries[meal]= query
        }
        else if(meal=== 'Lunch'){
            let query = `q=${string}&app_id=${ID}&app_key=${KEY}&to=${7}&diet=${data.dietaryPreference}${health}&calories=${data.calorie.lunch.from}-${data.calorie.lunch.to}`
            queries[meal]= query
        }
        else if(meal=== 'Dinner'){
            let query = `q=${string}&app_id=${ID}&app_key=${KEY}&to=${7}&diet=${data.dietaryPreference}${health}&calories=${data.calorie.dinner.from}-${data.calorie.dinner.to}`
            queries[meal]= query
        }

    })
    return queries

}
const getHealthValues=(healthPreferences)=>{
    let str= "&"
    if(healthPreferences.vegan){
        str+='health=vegan&'
    }
    if(healthPreferences.vegetarian){
        str+='health=vegetarian&'
    }
    if(healthPreferences.noAlcohol){
        str+='health=alcohol-free&'

    }
    if(healthPreferences.noPeanut){
        str+='health=peanut-free&'
    }
    return str
}

const buildRecipeQuery =(data, ID, KEY)=>{
    let amount = 1
    let query = `q=${data}&app_id=${ID}&app_key=${KEY}&to=${amount}`
    return query
}

export{getRecipe, getMenuPlan}
