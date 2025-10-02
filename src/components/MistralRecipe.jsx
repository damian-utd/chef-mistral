import ReactMarkdown from 'react-markdown'

export default function MistralRecipe(props) {
    const recipe = props.recipe;
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Mistral Recommends: </h2>
            <ReactMarkdown children={recipe} />
        </section>

    )
}