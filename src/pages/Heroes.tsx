import { DataStore } from "aws-amplify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heroes, LazyHeroes } from "../utils/models";
import { Header } from "../components/Header";
import Butterfly from '../assets/butterfly.png';
import { HeroNav } from "../components/Nav";

// import './index.scss';


const HeroList = ({heroes}: {heroes: LazyHeroes[]}) => {
    return (
        <div className="hero-list-container">
            <h2 style={{fontSize: '4em'}}>Our Heroes</h2>
            <div className="hero-list">
                {heroes.map(hero => <a key={hero.id} className="h2" href={'#' + hero.heroName?.replace(' ', '-')}>{hero.heroName}</a>)}
            </div>
        </div>
    )
}



const HeroSection = (hero: LazyHeroes) => {
    // const columnCount = hero.heroPhotos ? hero.heroPhotos?.length >= 3 ? 3 : hero.heroPhotos?.length : 0;

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



            <motion.img
            className="butterfly-img"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition= {{delay: 0.6, duration: 0.6}}
            src={Butterfly}
            />
        </div>
    )
};


const HeroPage = () => {
    const [heroData, setHeroes] = useState<LazyHeroes[]>([]);
    const [loading, setloading] = useState(true);
    // const getHeroes = async () => {
        // const heroData = await DataStore.query(Heroes, (c) => c.verified.eq(true));
        // console.log('heros', heroData);
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
    // }


    useEffect(() => {
        document.body.classList.add('heroes');
        // getHeroes();

        DataStore.query(Heroes, (c) => c.verified.eq(true)).then(res => {
            // console.log('res', res);
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


    return (
        <main>
            <HeroNav/>
            <Header title='Drug Epidemic Memorial Heroes' instruction={false}/>

            {heroData.length > 0 ?  <HeroList heroes={heroData}/> : <></>}
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