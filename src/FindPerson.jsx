import useAnalyticsEventTracker from "./useAnalyticsEvent";


const FindPerson = ({searchablePeople, personState}) => {
    const [searchPerson, setSearch] = personState;

    const gaEventTracker = useAnalyticsEventTracker('Menu');

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
                onFocus={() => gaEventTracker('click', 'find person')}
                value={searchPerson}
                placeholder="Name"
                onChange={(e) => setSearch(e.target.value)}/>

        </div>
    )
}

export default FindPerson;