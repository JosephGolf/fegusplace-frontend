import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item, index }) => (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
        <Link to={item.to}>
            <img
                src={item.img}
                className="img-fluid"
                alt={item.title}
                style={{ display: "block", margin: "auto", width: "100%" }}
            />
            {(item.title || item.description) && (
                <div className="carousel-caption d-none d-md-block" style={{ top: '38%' }}>
                    {item.title && <h5>{item.title}</h5>}
                    {item.description && <p>{item.description}</p>}
                </div>
            )}
        </Link>
    </div>
);

const Indicator = ({ id, index }) => (
    <li
        data-target={`#${id}`}
        data-slide-to={index}
        className={index === 0 ? "active" : ""}
    />
);

const Banner = (props) => {
    return (
        <div
            id={props.id}
            className={`carousel slide ${props.className}`}
            data-ride="carousel"
            style={{ minHeight: 100 }}
        >
            <ol className="carousel-indicators">
                {props.data.map((item, index) => (
                    <Indicator id={props.id} index={index} key={index} />
                ))}
            </ol>
            <div className="carousel-inner" style={{ maxHeight: '350px' }}>
                {props.data.map((item, index) => (
                    <Item item={item} index={index} key={index} />
                ))}
            </div>
            <a
                className="carousel-control-prev"
                href={`#${props.id}`}
                role="button"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href={`#${props.id}`}
                role="button"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Banner;
