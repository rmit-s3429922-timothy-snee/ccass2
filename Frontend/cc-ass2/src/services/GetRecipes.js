import {getAPIRecipeInfo} from "../data/api";

const getRecipe = (data)=>{
    const { ID, KEY, URL } = getAPIRecipeInfo()
    let queryObj = buildQuery(data,ID,KEY);
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

const buildQuery =(data, ID, KEY)=>{
    let amount = 1
    let query = `q=${data}&app_id=${ID}&app_key=${KEY}&to=${amount}`
    return query
}

export{getRecipe}
