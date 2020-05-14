package rmitccassignment2.ccass2.homepage;

import java.util.*;

public class UserService {
    private static HashMap<String, String> user = new HashMap<>();
    static {
        
    }

    public HashMap<String, String> getUser() {
        user.put("username", "Tim");
        return user;
    }
}