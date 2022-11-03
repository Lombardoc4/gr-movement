
// !! this is only for country and state!!
export default function DropdownList({data, action}) {
    return (
        data.map((item, i) => {
            return <div key={i + '-' + item.id} className="dropdown-option" onClick={() => action(item.id)}>{item.name ? item.name.toLowerCase() : (`${item.firstName} ${item.lastName}`).toLowerCase()} </div>
        })
    );
}