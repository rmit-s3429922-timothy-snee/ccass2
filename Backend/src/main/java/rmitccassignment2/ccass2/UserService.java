package rmitccassignment2.ccass2;

import java.io.UnsupportedEncodingException;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserService {

    BucketResource bucket_resource;
    Bucket bucket;

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
}