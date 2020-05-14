package rmitccassignment2.ccass2.recipe;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class RecipeResource{

    private RecipeService recipeService = new RecipeService();

    @RequestMapping("/recipes/")
    public List<Recipe> getAllRecipes() {
        return recipeService.findAll();
    }
}