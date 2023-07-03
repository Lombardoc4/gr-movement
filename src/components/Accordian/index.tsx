import { useState } from "react";
import { Ambassador, Person } from "../../utils/models";
import { styled } from "styled-components";

const StyledAccordian = styled.div`
        color: #000000;
        width: 100%;
        margin-top: 1rem;
        padding: 2rem;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 5px 25px -20px;

        h3{
            text-transform: capitalize;
        }
        
        .accordian-container{
            display: grid;
            gap: 2rem;
            margin-top: 1rem;
            overflow: hidden;
            max-height: 400rem;
            transition: max-height 1s ease-in;
        }

        .accordian-container.hide{
            max-height: 0rem;
            border-bottom: 0.1rem solid #e3e3e3;
            transition: max-height 0.4s 0s ease-out;
        }
        .accordian-toggler{
            cursor: pointer;
            display: inline;
            text-decoration: underline;
        }

        .accordian-item{
            font-size: 1.5rem;
            padding: 1rem 0 0.5rem;
            border-bottom: 1px solid #e3e3e3;

        }

        .accordian-container.worldwide .accordian-item{
            display: flex;
        }

        .accordian-item .country-name{
            margin-right: 0.5rem;
            overflow: hidden;
            font-weight: bold;
            display: inline-block;
        }
        
        @media only screen and (min-width: 768px) {
            .accordian-container.united-states{
                grid-template-rows: repeat(18, 1fr);
                grid-auto-flow: column;
            }

            .accordian-container.canada{
                grid-template-rows: repeat(5, 1fr);
                grid-auto-flow: column;
            }

            .accordian{
                height: 100%;
                // width: 33%;
                margin-top: 2rem;
            }

        }
`;

export const Accordian = ({title, data}: {title: string, data: {[key: string]: Ambassador[] | Person[]}}) => {
    const [hideDetails, setHideDetails] = useState(false);

    return (
        <StyledAccordian>
            <h3>{title.replaceAll('-', ' ')} - Total:{Object.values(data).reduce((total, state) => state.length + total, 0)} </h3>

            <div className="accordian-toggler" tabIndex={0} onClick={() => setHideDetails(!hideDetails)}>{hideDetails ? 'Show' : 'Hide'} Details</div>

            <div className={title + (hideDetails ? ' hide' : '') + " accordian-container"}>

                {Object.keys(data).map(value => (
                    <div key={value} className='accordian-item'>
                        <p className="country-name">{value}:</p>
                        <p>{data[value].length}</p>
                    </div>
                ))}
            </div>
        </StyledAccordian>
    );
}