package rmitccassignment2.ccass2.recipe;
public class Recipe {
    
    private Long id;
    private String recipeName;

    public Recipe(Long id, String recipeName){
        this.id = id;
        this.recipeName = recipeName;
    }

    public Long getID() {
        return this.id;
    }

    public String getRecipeName() {
        return this.recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }
}   