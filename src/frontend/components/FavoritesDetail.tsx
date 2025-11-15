

export default  function FavoritesItem({favorite, setFavorite}){
    
return (
    <div>    
        <div>
            <p>
                { favorite.Brand  }  
            </p>
            <p>
                { favorite.Model  }  
            </p>

            <div>
                <img src="https://image.com"></img>
            </div>
            <button onClick={()=> setFavorite(favorite) }></button>

        </div>
        
    </div>

)

}
