import { DataStore } from "aws-amplify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heroes, LazyHeroes } from "../models";

import './index.scss';



const HeroLanding = () => {
    return (
        <>
        <motion.div className="links"
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            transition= {{duration: 0.6}}
        >
            <h1>Drug Epidemic Memorial </h1>
            <a tabIndex={0} className="btn" href="https://drugepidemicmemorial.org/heroes">Recognize your hero</a>
            <a tabIndex={0} className="btn" href="info@drugepidemicmemorial.org">Contact Us</a>
        </motion.div>
        <div className="hero-landing">

            <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition= {{delay: 0.5, duration: 0.6}}
            >
                Heroes
            </motion.h2>


            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition= {{delay: 1, duration: 0.6}}
            >
                <p>The Drug Epidemic Memorial Wall is a virtual International wall honoring our loved ones.</p>
                <p>This stunning, heartbreaking, and seemingly endless stream of precious lives is a powerful visual created for healing, educationg, raising awareness and honoring our loved ones by saving lives.</p>

            </motion.div>
        </div>
        </>

    )
}


const HeroSection = (hero: LazyHeroes) => {
    const columnCount = hero.heroPhotos ? hero.heroPhotos?.length >= 3 ? 3 : hero.heroPhotos?.length : 0;

    return (
        <div className="hero-section">
            <div className="hero-main">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition= {{delay: 0.5, duration: 0.6}}
                    >
                    <h3 className="h1">{hero.heroName}</h3>
                    <p>{hero.bio}</p>
                </motion.div>
                <div className="profile-n-frame">
                    <motion.img
                        initial={{opacity: 0, x: 10}}
                        whileInView={{opacity: 1, x: 0}}
                        transition= {{delay: 0.5, duration: 0.6}}
                        src={hero.heroProfile || ''}
                        alt={hero.heroName || ''}>
                    </motion.img>

                    {hero.framePhoto?.map(photo => (
                        <motion.img
                        className="frameImg"
                        initial={{opacity: 0, x: 10}}
                        whileInView={{opacity: 1, x: 0}}
                        transition= {{delay: 0.6, duration: 0.6}}
                        src={photo || ''}
                        alt={hero.heroName || ''}>
                        </motion.img>
                    ))}
                </div>

            </div>
            <motion.div
                className="hero-video"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition= {{delay: 0.5, duration: 0.6}}
                >
                <video controls src={hero.heroVideo || ""}></video>
            </motion.div>

            <div className="hero-photos" style={{gridTemplateColumns: `repeat(${columnCount} , 1fr)`}}>
                {hero.heroPhotos?.map(photo => (
                    <motion.img
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    transition= {{delay: 0.6, duration: 0.6}}
                    src={photo || ''}
                    alt={hero.heroName || ''}>
                    </motion.img>
                ))}
            </div>
        </div>
    )
};

const HeroPage = () => {
    const [heroData, setHeroes] = useState<LazyHeroes[]>([]);
    const getHeroes = async () => {
        const heroData = await DataStore.query(Heroes);

        setHeroes( heroData );
    }


    useEffect(() => {
        getHeroes()
    },[])

    return (
        <main>
            <HeroLanding/>
            {heroData.map(hero => <HeroSection {...hero}/>)}
        </main>
    )
}
export default HeroPage;