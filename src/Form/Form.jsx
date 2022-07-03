
const TextArea = ({name, required = false}) => {

    const resizeHeight = () => {
        console.log('resize height');
    }

    return (
        <>
            <label htmlFor={name}>{name}</label>
            <textarea resize={false} onchange={resizeHeight} name={name} required={required}/>
        </>

    );
}

const Input = ({name, type = 'text', required = false}) => {
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input name={name} type={type} required={required}/>
        </>
    )
}

const Form = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="user-info">
                <h3>Your Infomation</h3>
                <Input name="Your First Name *" required={true}/>
                <Input name="Your Last Name *" required={true}/>
                <Input name="Your Email *" type="email" required={true}/>
                <Input name="Your Mobile Number *" type="tel" required={true}/>
                <TextArea name="In a short paragraph, can you tell us about your loved one? *" required={true}/>
            </div>
            <div className="loved-one-info">
                <h3>Your loved one's information:</h3>
                {/* <ImageInput name="Your First Name *" required={true}/> */}
                <Input name="Your Loved One's First Name *" required={true}/>
                <Input name="Your Loved One's Last Name *" required={true}/>
                <Input name="Forever Date * (e.g. 11/24/12)" required={true}/>
                <Input name="Forever Age * (e.g. 28)" required={true}/>
                <Input name="Cause Of Death *"  required={true}/>
                <Input name="Loved one's state where they lived when they passed away *"  required={true}/>
                <Input name="Relationship to your loved one?  *"  required={true}/>
            </div>
        </form>
    )
};

export default Form;