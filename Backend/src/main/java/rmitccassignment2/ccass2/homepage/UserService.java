package rmitccassignment2.ccass2.homepage;

import java.util.*;

public class UserService {
    private static long idCounter = 0;
    private static List<User> user = new ArrayList<>();
    static {
        user.add(new User(idCounter++, "Tim"));
    }

    public List<User> getUser() {
        return user;
    }
}