package rmitccassignment2.ccass2;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.KeyFactory;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.*;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

public class DataStoreResource {
    // @Autowired

    Datastore datastore;
    KeyFactory keyFactory;

    // Query<Entity> query = Query.newGqlQueryBuilder(Query.ResultType.ENTITY,
    // "select * from menuPlans").build();
    // QueryResults<Entity> results = datastore.run(query);

    DataStoreResource(){

        try {
            Credentials creds = GoogleCredentials
            .fromStream(new FileInputStream("CloudComputingAss2-d492cad86011.json"));
        
            this.datastore = DatastoreOptions.newBuilder().setCredentials(creds).setProjectId("s3429922-s3621713-ccass2")
            .build().getService();
        } catch (final FileNotFoundException e) {
            System.out.println("Credentials file not found");
        } catch (final IOException e) {
            System.out.println("Some Other Error");
        }
      
        this.keyFactory= datastore.newKeyFactory().setKind("MenuPlan");
    }
    public Long addMenuPlan(String userId) {
        Key key = datastore.allocateId(keyFactory.newKey());
        Entity menuPlan = Entity.newBuilder(key)
            .set("userId", userId)
            .set("timeStamp", Timestamp.now())
            .build();
        datastore.put(menuPlan);
        return key.getId();
      }
    public  List<String> getMenuPlan(String userId) {
    
        Query<Entity> query =Query.newEntityQueryBuilder().setKind("MenuPlan").setFilter(PropertyFilter.eq("userId", userId)).build();
        Iterator<Entity> tasks = datastore.run(query);
        List<String> strings = new ArrayList<>();
        while (tasks.hasNext()) {
          Entity task = tasks.next();
        
          if (task.getString("userId").equals(userId)) {
            strings.add(
                task.getKey().getId().toString());
          } 
        }
        return strings;
    }  

}

