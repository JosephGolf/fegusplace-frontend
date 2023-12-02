import React, { useEffect, lazy } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactStars from "react-rating-stars-component";
import {
  faCartPlus,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { homeServices } from "../../services/_home";
import { useParams } from "react-router-dom";
import { Nav, Tab, Tabs } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const CardFeaturedProduct = lazy(() =>
    import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
    import("../../components/others/RatingsReviews")
);
const ShippingReturns = lazy(() =>
    import("../../components/others/ShippingReturns")
);

function ProductDetailView(props) {
  const [product, setProduct] = React.useState({});
  const [image, setImage] = React.useState([]);
  const [activeImg, setActiveImg] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [productType, setProductType] = React.useState("");
  const [review, setReview] = React.useState([]);
  let { proName } = useParams();

  useEffect(() => {
    props.onLoad(proName);
    homeServices.getProduct(proName).then((pro) => {
      setActiveImg(pro.data.image[0]);
      setImage(pro.data.image);
      setProduct(pro.data);
      setProductType(product.product_cat);
      homeServices
          .getProductsByMainCat(pro.data.product_cat.main)
          .then((data) => {
            setProducts(data.data);
          });
    });
    homeServices.getProductReview(product._id).then((data) => {
      setReview(data.data);
    });
  }, [setProduct, setProducts]);

  const stars = {
    size: 30,
    value: 4,
    edit: false,
  };

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'NGN',
    });
  }

  return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              {/* ... (rest of your code) */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Tabs defaultActiveKey="nav-details" id="nav-tab">
                  <Tab eventKey="nav-details" title="Details">
                    <Details description={product.description} />
                  </Tab>
                  <Tab eventKey="nav-randr" title="Ratings & Reviews">
                    <RatingsReviews productID={product._id} />
                  </Tab>
                  <Tab eventKey="nav-ship-returns" title="Shipping & Returns">
                    <ShippingReturns />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <CardFeaturedProduct data={products} />
            <CardServices />
          </div>
        </div>
      </div>
  );
}
const mapStateToProps = (state) => {
  return { count: state.productReducer.count };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPlus: (proName) => dispatch({ type: "PLUS", name: proName }),
    onMinus: (proName) => dispatch({ type: "MINUS", name: proName }),
    onAddToCart: (userProduct) =>
      dispatch({ type: "ADDTOCART", product: userProduct }),
    onLoad: (proName) => dispatch({ type: "LOAD", name: proName }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailView);
