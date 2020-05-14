package rmitccassignment2.ccass2.homepage;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class HomePageController {

    private UserService userService = new UserService();
    
    @RequestMapping("/main/")
    public List<User> index() {
        return userService.getUser();
    }

}