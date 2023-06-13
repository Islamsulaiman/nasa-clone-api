import SearchBar from "../../Components/Search-Bar/Search";
import Typewriter from "typewriter-effect";
import "./Home.css"

const Home = () => {
    return ( 
        <>
        <div id="home">
            <div className="typing">
                <Typewriter
    
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome to GalaxyGalleria")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Here you can discover marvelous collection of assets, images, videos, ..etc")
                            .start();
                    }}
                />
            </div>
            <SearchBar/>
        </div>
        
        </>

     );
}
 
export default Home;