const FindPerson = ({personState, closeModal}) => {
    const [searchPerson, setSearch] = personState;


    return (
        <div>
            <label  htmlFor="person-search">
            Find Your Loved One
            </label>
            <input
                type="text"
                name="person-search"
                 className="search-input"
                 value={searchPerson}
                 placeholder="Name"
                 onChange={(e) => setSearch(e.target.value)}/>

            <div className="btn" style={{margin: '1em auto 0'}} onClick={closeModal} >Close</div>
        </div>
    )
}

export default FindPerson;