package rmitccassignment2.ccass2;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class LoginService {
    
    private static HashMap<String, String> user = new HashMap<>();

    @PostMapping("/login/")
    public ResponseEntity<Post> createPost(HttpServletRequest request,
                                    UriComponentsBuilder uriComponentsBuilder){
        return getUser();
    }
    
    public HashMap<String, String> getUser() {
        user.put("username", "Tim");
        return user;
    }
}