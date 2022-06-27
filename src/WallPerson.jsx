
const WallPerson = ({person}) => {



    return (
        <div name={person.firstName + ' ' + person.lastName} className='person-info'>
            <h2 className='name' style={{fontSize: '36px'}}>
                {person.firstName}
                {" "}
                {person.lastName}
                {person.foreverAge &&
                    <>
                    {", "}
                    {person.foreverAge}
                    </>
                }
                {" "}
                <span>·</span>
            </h2>
        </div>
    )
}

export default WallPerson;