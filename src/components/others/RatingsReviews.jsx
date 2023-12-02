import React, { useEffect, useState } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconCheckCircleFill } from "bootstrap-icons/icons/check-circle-fill.svg";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { homeServices } from "../../services/_home";

const RatingsReviews = (props) => {
  const [productID, setProductID] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [reviews, setReviews] = useState([]);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  const stars = {
    size: 30,
    value: 0,
    onChange: (newValue) => {
      setProductID(props.productID);
      setUserName(props.user.name);
      setRating(newValue);
    },
  };

  useEffect(() => {
    setProductID(props.productID);
    if (props.productID) {
      homeServices.getProductReview(props.productID).then((data) => {
        setReviews(data.data);
        /*console.log(data.data);*/
        const userAlreadyReviewed = data.data.some((review) => review.userName === props.user.name);
        setUserHasReviewed(userAlreadyReviewed);
      });
    }
  }, [props.productID, props.user.name]);

  const onSubmit = () => {
    if (productID && userName && rating && reviewText && createdAt) {
      if (userHasReviewed) {
        alert("You have already submitted a review for this product.");
        return;
      }

      homeServices.addReview(productID, userName, rating, reviewText, createdAt)
          .then(() => {
            /*console.log(data);*/
            window.location.reload();
          });
      homeServices.getProductReview(props.productID).then((data) => {
        setReviews(data.data);
        setUserHasReviewed(true);
      });
    }
  };

  return (
      <div className="mb-3">
        {!userHasReviewed && props.user && (
            <div className="border-bottom">
              <div className="mb-2">
            <span>
              <ReactStars {...stars} />
            </span>
              </div>
              <form className="my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your comment"
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-success my-3"
                    onClick={onSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
        )}

        {reviews &&
            reviews.map((review, index) => {
              const newStars = {
                size: 30,
                value: review.rating,
                edit: false,
              };
              return (
                  <div key={index} className="border-bottom my-3">
              <span>
                <ReactStars {...newStars} />
              </span>
                    <span className="text-muted">
                <IconCheckCircleFill className="text-success mr-1" />
                      {review.userName} | Reviewed on{" "}
                      <i className="font-weight-bold">{new Date(review.createdAt).toLocaleDateString()}</i>
              </span>
                    <p className="my-3">{review.reviewText}</p>
                  </div>
              );
            })}
      </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.productReducer.userInfo };
};

export default connect(mapStateToProps)(RatingsReviews);
