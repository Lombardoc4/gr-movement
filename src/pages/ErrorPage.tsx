
export const ErrorElement = () => (
    <div style={{width: '300px', padding: '2em 0',  margin: 'auto', color: '#ffffff'}}>
        <p>Join the community and share your story</p>
        <button>Add Your Loved One</button>
        <button>Become an ambassador</button>

        <br/><br/>
        <p>View our memories:</p>
        <button>Name Memorial</button>
        <button>Photo Memorial</button>
        <button>Photo Memorial (Teens)</button>
        <button>Heros</button>
    </div>
)

const ErrorPage = () => {
    return (
        <>
            <h1>Page Not Found</h1>
            <ErrorElement/>
        </>
    );
}

export default ErrorPage