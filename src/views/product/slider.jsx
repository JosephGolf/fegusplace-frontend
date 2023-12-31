import React from 'react';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import {formatTitle} from "../../pipes/formatTitle";
import 'react-alice-carousel/lib/alice-carousel.css';
function Slider(props) {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN',
        });
    }

    const items = props.data.map((item) => (
        <div key={item.productId} className="card text-center m-3">
            <div className="card-body">
                <div className="mb-3">
                    <p className="font-weight-bold h5 mr-2">
                        {formatCurrency(parseFloat(item.price))}
                    </p>
                    <span className="rounded p-1 bg-warning  mr-2 small">
            {item.discount}%
          </span>
                </div>
                <Link className="text-decoration-none" to={`/product/detail/${item.nameEn}`}>
                    <img src={item.image} style={{ width: '100px' }} alt={item.nameEn} />
                    <h6 className="card-title text-capitalize">{formatTitle(item.nameEn)}</h6>
                    <div className="card-text text-success">{item.brand}</div>
                    <small className="text-muted">{item.brand}</small>
                </Link>
            </div>
        </div>
    ));

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay
            autoPlayInterval={3000}
        />
    );
}
export default Slider;


