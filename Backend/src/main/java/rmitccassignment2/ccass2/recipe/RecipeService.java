package rmitccassignment2.ccass2;

import java.util.*;

public class RecipeService {
    private static List<Recipe> recipes = new ArrayList<>();
    private static long idCounter = 0;

    static {
        recipes.add(new Recipe(++idCounter, "Garlic Bread"));
        recipes.add(new Recipe(++idCounter, "Fettucine Carbonara"));
        recipes.add(new Recipe(++idCounter, "Cheesecake"));
    }

    public List<Recipe> findAll() {
        return recipes;
    }
}