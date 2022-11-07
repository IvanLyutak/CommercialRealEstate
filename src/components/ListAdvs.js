import "./ListAdvs.css"

function ListAdvs({ads, choiceAdvt}) {

    return (
        <>
            {ads.map((ad) => (
                <div className="viewAdvt" key={Math.random()} onClick={() => choiceAdvt(ad)}>
                <div className="ImageAdvt">
                    <img src={ad["img"]} alt="Img"/>
                </div>
                <div className="contentAdvt">
                    <div className="nameAdvt"> 
                        <div className="nameAdvtText">
                            { ad["name"] }
                        </div>
                    </div>
                    <div className="buildAdvt">  { ad["build"] } </div>
                    <div className="addressAdvt"> { ad["address"] }</div>
                    <div className="priceAdvt"> 
                        <div className="priceAdvtText">
                            { ad["price"] } ₽/мес.
                        </div>
                    </div>
                    <div className="squareAdvt"> { ad["square"] } м <sup><small>2</small></sup> </div>
                </div>
            </div>
            ))}
            <br />
        </>
    )
}

export default ListAdvs