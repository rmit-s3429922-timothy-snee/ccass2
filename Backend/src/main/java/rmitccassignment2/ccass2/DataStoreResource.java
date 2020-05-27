package rmitccassignment2.ccass2;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.auth.appengine.AppEngineCredentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.Timestamp;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.Value;

public class DataStoreResource {
    // @Autowired

    Datastore datastore;
    KeyFactory keyFactory;
    KeyFactory recipeKeyFactory;

    // Query<Entity> query = Query.newGqlQueryBuilder(Query.ResultType.ENTITY,
    // "select * from menuPlans").build();
    // QueryResults<Entity> results = datastore.run(query);

    DataStoreResource() {

        try {
            GoogleCredentials creds = AppEngineCredentials.getApplicationDefault();
            this.datastore = DatastoreOptions.newBuilder().setCredentials(creds)
                    .setProjectId("s3429922-s3621713-ccass2").build().getService();
        } catch (final FileNotFoundException e) {
            System.out.println("Credentials file not found");
        } catch (final IOException e) {
            System.out.println("Some Other Error");
        }

        this.keyFactory = datastore.newKeyFactory().setKind("MenuPlan");
        this.recipeKeyFactory = datastore.newKeyFactory().setKind("Recipes");
    }

    public Long addMenuPlan(String userId, MenuPlanRecipes payload) {
        Key key = datastore.allocateId(keyFactory.newKey());

        List<String> breakfastIds = addBreakfastRecipes(payload, key);
        List<Value<String>> breakfastListValues = convertToValueList(breakfastIds);

        List<String> lunchIdsList = addLunchRecipes(payload, key);
        List<Value<String>> lunchValues = convertToValueList(lunchIdsList);

        List<String> dinnerIdsList = addDinnerRecipes(payload, key);
        List<Value<String>> dinnerValues = convertToValueList(dinnerIdsList);

        Entity menuPlan = Entity.newBuilder(key).set("id", key.getId().toString()).set("userId", userId)
                .set("timeStamp", Timestamp.now()).set("breakfast", breakfastListValues).set("lunch", lunchValues)
                .set("dinner", dinnerValues).build();
        datastore.put(menuPlan);
        return key.getId();
    }

    public Long addRecipe(String userId, Recipes payload) {
        Key key = datastore.allocateId(recipeKeyFactory.newKey());
        Entity recipe = Entity.newBuilder(key).set("id", key.getId().toString()).set("label", payload.label)
                .set("userId", userId).set("image", payload.image).set("url", payload.url)
                .set("calories", payload.calories).set("yield", payload.yield).build();
        datastore.put(recipe);
        return key.getId();
    }

    public List<Map<String, Object>> getUserRecipes(String userId) {

        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Recipes")
                .setFilter(PropertyFilter.eq("userId", userId)).build();
        Iterator<Entity> tasks = datastore.run(query);

        while (tasks.hasNext()) {
            Entity task = tasks.next();

            Map<String, Object> map = new HashMap<>();
            map.put("id", task.getString("id"));
            map.put("userId", task.getString("userId"));
            map.put("calories", task.getString("calories"));
            map.put("image", task.getString("image"));
            map.put("label", task.getString("label"));
            map.put("url", task.getString("url"));
            map.put("yield", task.getString("yield"));

            mapList.add(map);

        }
        return mapList;

    }

    public List<String> addBreakfastRecipes(MenuPlanRecipes payload, Key menuPlanKey) {
        List<String> breakfast = new ArrayList<String>();
        for (int i = 0; i < payload.breakfast.size(); i++) {

            Key recipeKey = datastore.allocateId(recipeKeyFactory.newKey());
            Entity menuPlan = Entity.newBuilder(recipeKey).set("id", recipeKey.getId().toString())
                    .set("menuPlanId", menuPlanKey.getId().toString()).set("label", payload.breakfast.get(i).label)
                    .set("image", payload.breakfast.get(i).image).set("url", payload.breakfast.get(i).url)
                    .set("calories", payload.breakfast.get(i).calories).set("yield", payload.breakfast.get(i).yield)
                    .build();
            datastore.put(menuPlan);
            breakfast.add(recipeKey.getId().toString());
        }
        return breakfast;
    }

    public List<String> addLunchRecipes(MenuPlanRecipes payload, Key menuPlanKey) {
        List<String> lunch = new ArrayList<String>();
        for (int i = 0; i < payload.lunch.size(); i++) {

            Key recipeKey = datastore.allocateId(recipeKeyFactory.newKey());
            Entity menuPlan = Entity.newBuilder(recipeKey).set("id", recipeKey.getId().toString())
                    .set("menuPlanId", menuPlanKey.getId().toString()).set("label", payload.lunch.get(i).label)
                    .set("image", payload.lunch.get(i).image).set("url", payload.lunch.get(i).url)
                    .set("calories", payload.lunch.get(i).calories).set("yield", payload.lunch.get(i).yield).build();
            datastore.put(menuPlan);
            lunch.add(recipeKey.getId().toString());
        }
        return lunch;
    }

    public List<String> addDinnerRecipes(MenuPlanRecipes payload, Key menuPlanKey) {
        List<String> dinner = new ArrayList<String>();
        for (int i = 0; i < payload.dinner.size(); i++) {

            Key recipeKey = datastore.allocateId(recipeKeyFactory.newKey());
            Entity menuPlan = Entity.newBuilder(recipeKey).set("id", recipeKey.getId().toString())
                    .set("menuPlanId", menuPlanKey.getId().toString()).set("label", payload.dinner.get(i).label)
                    .set("image", payload.dinner.get(i).image).set("url", payload.dinner.get(i).url)
                    .set("calories", payload.dinner.get(i).calories).set("yield", payload.dinner.get(i).yield).build();
            datastore.put(menuPlan);
            dinner.add(recipeKey.getId().toString());
        }
        return dinner;
    }

    List<Value<String>> convertToValueList(List<String> list) {
        List<Value<String>> result = new ArrayList<Value<String>>();
        for (String s : list) {
            result.add(StringValue.of(s));
        }

        return result;
    }

    public List<Map<String, Object>> getMenuPlan(String userId) {

        Query<Entity> query = Query.newEntityQueryBuilder().setKind("MenuPlan")
                .setFilter(PropertyFilter.eq("userId", userId)).build();
        Iterator<Entity> tasks = datastore.run(query);

        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        while (tasks.hasNext()) {
            Entity task = tasks.next();
            if (task.getString("userId").equals(userId)) {

                Map<String, Object> map = new HashMap<>();
                map.put("id", task.getString("id"));
                map.put("userId", task.getString("userId"));
                map.put("timeStamp", task.getTimestamp("timeStamp").toDate());
                List<Map<String, Object>> breakfast = generateRecipeList(task.getList("breakfast"));
                List<Map<String, Object>> lunch = generateRecipeList(task.getList("lunch"));
                List<Map<String, Object>> dinner = generateRecipeList(task.getList("dinner"));
                map.put("breakfast", breakfast);
                map.put("lunch", lunch);
                map.put("dinner", dinner);
                mapList.add(map);

            }
        }
        return mapList;
    }

    public List<Map<String, Object>> generateRecipeList(List<Value<?>> entityList) {

        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < entityList.size(); i++) {
            String value = (String) entityList.get(i).get();

            Query<Entity> query = Query.newEntityQueryBuilder().setKind("Recipes")
                    .setFilter(PropertyFilter.eq("id", value)).build();
            Iterator<Entity> tasks = datastore.run(query);

            while (tasks.hasNext()) {
                Entity task = tasks.next();

                Map<String, Object> map = new HashMap<>();
                map.put("id", task.getString("id"));
                map.put("calories", task.getString("calories"));
                map.put("image", task.getString("image"));
                map.put("label", task.getString("label"));
                map.put("url", task.getString("url"));
                map.put("yield", task.getString("yield"));

                mapList.add(map);

            }
        }
        return mapList;

    }

}
