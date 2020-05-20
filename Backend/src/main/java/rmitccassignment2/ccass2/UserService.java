package rmitccassignment2.ccass2;

import static java.nio.charset.StandardCharsets.UTF_8;

import java.util.Map;

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
                return new String(currentBlob.getContent());
            }
        }
        return "No User";
    }

    @RequestMapping(value = "/set/{username}", method = RequestMethod.POST)
    public void setPantry(@PathVariable("username") String username, @RequestBody Map<String, Object> pantry) {
        BucketResource bucket_resource = new BucketResource();
        Bucket bucket = bucket_resource.getBucket();
        bucket.create(username + ".json", pantry.toString().getBytes(UTF_8));
    }

    @RequestMapping(path = "/")
    public String hello() {
        return "Hello";
    }
}