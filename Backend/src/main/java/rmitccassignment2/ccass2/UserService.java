package rmitccassignment2.ccass2;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class UserService {

    BucketResource bucket_resource;
    Bucket bucket;
    DataStoreResource data_store_resource = new DataStoreResource();

    @RequestMapping(path = "/user/{username}")
    public String getPantry(@PathVariable("username") String username) {
        bucket_resource = new BucketResource();
        bucket = bucket_resource.getBucket();
        for (Blob currentBlob : bucket.list().iterateAll()) {
            if (currentBlob.getName().equals(username.toString() + ".json")) {
                String json = new String(currentBlob.getContent());
                return json;
            }
        }
        return null;
    }

    @RequestMapping(value = "/set/{username}", method = RequestMethod.POST)
    public void setPantry(@PathVariable("username") String username, @RequestBody String pantry)
            throws UnsupportedEncodingException {
        BucketResource bucket_resource = new BucketResource();
        Bucket bucket = bucket_resource.getBucket();
        System.out.println(pantry);

        bucket.create(username + ".json", pantry.getBytes("UTF-8"));
    }

    @RequestMapping(value = "/newmenuplan/{username}", method=RequestMethod.POST)
    public Long addNewMenuPlan(@PathVariable("username") String username, @RequestBody MenuPlanRecipes payload) {
        return data_store_resource.addMenuPlan(username, payload);

    }
    @RequestMapping(value = "/addRecipe/{username}", method=RequestMethod.POST)
    public Long addRecipe(@PathVariable("username") String username, @RequestBody Recipes payload) {
        return data_store_resource.addRecipe(username, payload);

    }
    @RequestMapping(value = "/getRecipes/{username}")
    public List<Map<String,Object>>getRecipes(@PathVariable("username") String username) {
        return data_store_resource.getUserRecipes(username);
    }

    @RequestMapping(value = "/menuplan/{username}")
    public List<Map<String,Object>>getMenuPlan(@PathVariable("username") String username) {
        return data_store_resource.getMenuPlan(username);
    }

    @RequestMapping(path = "/")
    public String hello() {
        return "Hello";
    }

}