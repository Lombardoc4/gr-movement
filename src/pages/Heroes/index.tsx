import { DataStore, Hub } from "aws-amplify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heroes, LazyHeroes } from "../../utils/models";

import './index.scss';


const HeroList = ({heroes}: {heroes: LazyHeroes[]}) => {
    return (
        <div>
            <h2 style={{fontSize: '2rem'}}>Our Heroes</h2>
            <div className="hero-list">
                {heroes.map(hero => <a key={hero.id} className="h2" href={'#' + hero.heroName?.replace(' ', '-')}>{hero.heroName}</a>)}
            </div>
        </div>
    )
}

const HeroLanding = ({children}: {children: React.ReactChild}) => {
    return (<>
        <motion.div className="links"
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            transition= {{duration: 0.6}}
        >
            <h1>Drug Epidemic Memorial </h1>
            <div className="btn-group">

                <a tabIndex={0} className="btn" href="https://drugepidemicmemorial.org/heroes">Recognize your&nbsp;hero</a>
                <a tabIndex={0} className="btn" href="info@drugepidemicmemorial.org">Contact Us</a>
            </div>
        </motion.div>

        <div className="hero-landing">
            <div>
                <motion.h2
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition= {{delay: 0.6, duration: 0.6}}
                >
                    Heroes
                </motion.h2>

                <div className="landing-graphic">
                    <motion.img
                    className="flair-img"
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition= {{delay: 0.2, duration: 0.6}}
                    src="./bg-flair.png"
                    />
                    <motion.img
                    className="flair-img"
                    style={{ scaleX: -1 }}
                    initial={{opacity: 0, x: 20, }}
                    animate={{opacity: 1, x: 0}}
                    transition= {{delay: 0.2, duration: 0.6}}
                    src="./bg-flair.png"
                    />
                    <motion.img
                    className="butterfly-img"
                    style={{x: window.innerWidth > 690 ? -100 : -50}}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition= {{delay: 0.5, duration: 0.6}}
                    src="./memorial-butterfly.png"
                    />
                </div>
            </div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition= {{delay: 1.2, duration: 0.6}}
            >
                <p>The Drug Epidemic Memorial Wall is a virtual International wall honoring our loved ones.</p>
                <p>This stunning, heartbreaking, and seemingly endless stream of precious lives is a powerful visual created for healing, educationg, raising awareness and honoring our loved ones by saving lives.</p>

            </motion.div>


            {children}
        </div>
    </>)
}


const HeroSection = (hero: LazyHeroes) => {
    const columnCount = hero.heroPhotos ? hero.heroPhotos?.length >= 3 ? 3 : hero.heroPhotos?.length : 0;

    return (
        <div className="hero-section" id={hero.heroName?.replace(' ', '-')}>

            <div className="hero-main">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition= {{delay: 0.5, duration: 0.6}}
                    >
                    <h3 className="h1" >{hero.heroName}</h3>
                    <h4 className="h2">{hero.state}</h4>
                    <p>{hero.bio}</p>
                </motion.div>
                {/* <div className="profile-n-frame"> */}
                    {hero.heroProfile &&
                    <div className="profile-photo">
                    <motion.img

                    initial={{opacity: 0, x: 10}}
                    whileInView={{opacity: 1, x: 0}}
                    transition= {{delay: 0.5, duration: 0.6}}
                    src={hero.heroProfile || ''}
                    alt={hero.heroName || ''}>
                    </motion.img>
                    </div>
                    }

                    {hero.framePhoto?.map(photo => (
                        <div
                        key={photo}
                        className="frameImg">

                        <motion.img
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        transition= {{delay: 0.6, duration: 0.6}}
                        src={photo || ''}
                        alt={hero.heroName || ''}>
                        </motion.img>
                        </div>
                    ))}

                    {hero.heroVideo &&
                    <motion.div
                        className="hero-video"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition= {{delay: 0.5, duration: 0.6}}
                        >
                        <video controls src={hero.heroVideo || ""}></video>
                    </motion.div>
                    }
                {/* </div> */}

                {hero.heroPhotos?.map(photo => (
                <div>
                    <motion.img
                    key={photo}
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    transition= {{delay: 0.6, duration: 0.6}}
                    src={photo || ''}
                    alt={hero.heroName || ''}>
                    </motion.img>
                </div>
                ))}
            </div>



            {/* <div className="hero-photos" style={{gridTemplateColumns: `repeat(${columnCount} , 1fr)`}}> */}
            {/* </div> */}

            <motion.img
            className="butterfly-img"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition= {{delay: 0.6, duration: 0.6}}
            src="./memorial-butterfly.png"
            />
        </div>
    )
};


const HeroPage = () => {
    const [heroData, setHeroes] = useState<LazyHeroes[]>([]);
    const [loading, setloading] = useState(true);
    const getHeroes = async () => {
        const heroData = await DataStore.query(Heroes, (c) => c.verified.eq(true));
        console.log('heros', heroData);
        // return await ;

        // heroData.sort(function(a, b) {
        //     var keyA = a.state || '',
        //       keyB = b.state || '';

        //       // Compare the 2
        //     if (keyA < keyB) return -1;
        //     if (keyA > keyB) return 1;

        //     return 0;
        // });

        // console.log('heroData', heroData);

        // setHeroes( heroData );
    }


    useEffect(() => {
        document.body.classList.add('heroes');
        // getHeroes();

        DataStore.query(Heroes, (c) => c.verified.eq(true)).then(res => {
            console.log('res', res);
            setHeroes(res)
            if (res.length > 0)
                setloading(false);
        }).catch(err => {
            console.log('err',err)
        })

        return () => {
            document.body.classList.remove('heroes');
        }
    }, [loading])

    console.log('loading', loading)

    return (
        <main>
            <HeroLanding>
                {heroData.length > 0 ?  <HeroList heroes={heroData}/> : <></>}
            </HeroLanding>
            { loading ?
            <div style={{padding: '2rem'}}>
                <p style={{textAlign: 'center', fontWeight: 700}}>Loading...</p>
                <p style={{textAlign: 'center', fontWeight: 700, fontSize: '0.75em'}}>(Try Refreshing)</p>
            </div>
            :
            heroData.map(hero => <HeroSection key={hero.id} {...hero}/>)}
        </main>
    )
}
export default HeroPage;