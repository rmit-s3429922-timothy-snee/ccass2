package rmitccassignment2.ccass2;

import java.io.FileNotFoundException;
import java.io.IOException;

import com.google.auth.appengine.AppEngineCredentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

public class BucketResource {

    Bucket bucket;

    public BucketResource() {
        try {
            System.out.println(System.getProperty("user.dir"));
            GoogleCredentials creds = AppEngineCredentials.getApplicationDefault();
            Storage storage = StorageOptions.newBuilder().setCredentials(creds).setProjectId("s3429922-s3621713-ccass2")
                    .build().getService();
            this.bucket = storage.get("ccass2-bucket");

        } catch (final FileNotFoundException e) {
            System.out.println("Credentials file not found");
        } catch (final IOException e) {
            System.out.println("Some Other Error");
        }
    }

    public Bucket getBucket() {
        return this.bucket;
    }
}