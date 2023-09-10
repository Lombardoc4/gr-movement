// import { useRouteError } from "react-router-dom";
import { Header } from "../components/Header";
import styled from "styled-components";
import { Navbar } from "../components/Nav";

const StyledErrorPage = styled.div`
    color: #ffffff;

    .content {
        width: clamp(300px, 50%, 700px);
        margin: auto;
        padding: 2em 0 0;

        p {
            font-size: 1.5em;
        }

        .btn-group {
            display: flex;
            gap: 1em;
            padding: 0.5em 0;
        }
    }


	.intro {
		margin-bottom: 0;
	}
`;

export const ErrorElement = ({children} : {children?: JSX.Element}) => {
    // const error = useRouteError();

    // console.log('err', error)
    return (
        <>
            <Header title='Page Not Found' />

        <StyledErrorPage className="container">
            <div className="content">

                <p>Join the community and share your story</p>
                <div className='btn-group'>
                    <button>Add Your Loved One</button>
                    <button>Become an ambassador</button>
                </div>

                <br />
                <br />
                <p>View our memorial walls:</p>
                <div className='list'>
                    <button>Name Memorial</button>
                    <button>Photo Memorial</button>
                    <button>Photo Memorial (Teens)</button>
                    <button>Heros</button>
                </div>
            </div>
            {children}
		</StyledErrorPage>
        </>
    )
}

const ErrorPage = () => {
	return (
        <>
            <Navbar/>
            <ErrorElement />
        </>
    );
};

export default ErrorPage;
