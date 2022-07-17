const FindPerson = ({searchablePeople, personState}) => {
const [searchPerson, setSearch] = personState;

let people = []
Object.values(searchablePeople).map(peopleByState => people = [...people, ...peopleByState]);

    return (
        <div className="personSearch">
            <label  htmlFor="personSearch">
            Find Your Loved One
            </label>
            <input
                type="text"
                name="personSearch"
                 className="search-input"
                 value={searchPerson}
                 placeholder="Name"
                 onChange={(e) => setSearch(e.target.value)}/>

        </div>
    )
}

export default FindPerson;