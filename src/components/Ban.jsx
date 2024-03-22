

const Ban = (banList) =>
{
    return(
        <div className="sideNav">
      <h2>Ban List</h2>
      <h3>Select an attribute to filter</h3>
      <div className="sideNav-container">
        {banList.banList.map((item, index) => (
          <div className="attribute">

          <button
            key={index}
            type="banned item"
            className="banned-buttons"
          >
            {item}
          </button>
          </div>
        ))}
      </div>
    </div>

    )
     
}
export default Ban