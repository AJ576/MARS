axios.get(url).then((response)=>
      {
        if(response.data.photos.length == 0 || response.data == null)
        {
          console.log("something is wrong. Try again")
          alert("something is wrong. Try again")
        }
        else
        {
          setData(response.data.photos[0].img_src)
        }
        
        
      })
    