
import "./Reviews.css"

function Reviews({reviews}) {
  return (
    <>
    <div className="labelReviews">
                    Наши отзывы
    </div>
      {reviews.map((review) => (
        <div className="viewReview" key={Math.random()}>
                <div className="EmodjiView">
                    <div className="EmodjiTable">
                        <div className="Emodji"> {review.image} </div>
                    </div>
                </div>
                <div className="labelReview">
                    <div className="nameReview"> 
                        <div className="nameTextReview"> 
                            {review.name} 
                        </div>
                    </div>
                </div>
            <div className="textReview">
                <div className="textTextReview"> 
                    {review.text} 
                </div>
            </div>
        </div>
      ))}
    </>
  )
}

export default Reviews
