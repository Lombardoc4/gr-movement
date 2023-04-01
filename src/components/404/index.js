import { Link } from "react-router-dom";
import { StaticMenu } from "../Menu";

const Page404 = () => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
            justifyContent: 'center',
            background: '#fbf2ef'
        }}
    >

    <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '390px',
        margin: 'auto',
        justifyContent: 'center'
    }}>
        <p style={{fontWeight: 700, textAlign: 'center'}}>This page does not exists</p>
        <StaticMenu>
            <Link className="add-btn" to="/">Global Memorial Wall</Link>
        </StaticMenu>
    </div>
    </div>
)

export default Page404