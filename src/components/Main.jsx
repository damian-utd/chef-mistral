import { useState, useEffect, useRef } from 'react'
import MistralRecipe from './MistralRecipe.jsx'
import IngredientList from './IngredientList'
import { getRecipeFromMistral } from './ai.js'

export default function Main() {

    const [ingredients, setIngredients] = useState(
        []
    )

    const [recipe, setRecipe] = useState("")

    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null)
            recipeSection.current.scrollIntoView({behavior: "smooth"})
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
    }

    return (
        <main>
            <div className="container">
                <form action={addIngredient} className="add-ingredient-form">
                    <input
                        className="input-text"
                        type="text"
                        placeholder="e.g. basic spices"
                        aria-label="Add ingredient"
                        name="ingredient"
                    />
                    <button className="input-button">Add ingredient</button>
                </form>
                {ingredients.length !== 0 ?
                    <IngredientList
                        ref={recipeSection}
                        ingredients={ingredients}
                        handleClick={getRecipe}
                    /> :
                    null}

                {recipe ? <MistralRecipe recipe={recipe}/> : null}

            </div>
        </main>
    )
}