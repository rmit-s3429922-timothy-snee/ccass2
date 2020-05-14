package rmitccassignment2.ccass2.homepage;

public class User {
    private Long id;
    private String username;

    public User(Long id, String username){
        this.id = id;
        this.username = username;
    }

    public Long getID() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }
}