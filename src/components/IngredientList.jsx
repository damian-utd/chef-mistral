export default function IngredientList(props) {

    const {ingredients, handleClick, ref} = props



    const ingredientListItems = ingredients.map((ingredient, index) => {
        return (
            <li key={index}>{ingredient}</li>
        )
    })

    return (
        <section>
            <h2>Ingredients on hand: </h2>
            <ul className="ingredients-list">
                {ingredientListItems}
            </ul>

            {ingredients.length > 3 ? <div className="get-recipe-container">
                <div ref={ref} className="recipe-section">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={handleClick}>Get a recipe
                </button>
            </div> : null}
        </section>
    )
}