
function Gallery(data)
{
    console.log(data)
   return( <div>
        <img src = {data} style ={{width: '50px', height:'50px'}}></img>
       
    </div>
   )
   
}

export default Gallery