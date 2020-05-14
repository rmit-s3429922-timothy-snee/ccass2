package rmitccassignment2.ccass2.homepage;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class HomePageController {

    private UserService userService = new UserService();
    
    @RequestMapping("/main/")
    public HashMap<String, String> index() {
        return userService.getUser();
    }

}