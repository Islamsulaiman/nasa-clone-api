import "./Search.css"

const SearchBar = () => {
    return ( 
        <>
        <div class="search-box">
            <input class="search-input" type="text" placeholder="Search something.."/>
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
        
        </>

     );
}
 
export default SearchBar;