import { styled } from "styled-components";

export const Loader = () => (
    <StyledLoader>
        <p className='h1 loading-loader'>Loading</p>
    </StyledLoader>
);

const StyledLoader = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .loading-loader:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 1200ms infinite;
        animation: ellipsis steps(4, end) 1200ms infinite;
        content: "..."; /* ascii code for the ellipsis character */
        width: 0px;
    }

    @keyframes ellipsis {
        to {
            width: 1em;
        }
    }

    @-webkit-keyframes ellipsis {
        to {
            width: 1em;
        }
    }
`;