import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
// import { link45, file, check2all } from "../npm/icon";
import { useTranslation } from "react-i18next";
import { data } from "../data";
import Slider from "./product/slider";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import TopMenu from "../components/TopMenu";

import { homeServices } from "../services/_home";
const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

class HomeViewClass extends Component {
  components = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  constructor(props) {
    super(props);

    this.state = {
      cats: [],
      products: [],
      suerpMarkets: [],
      sliders: [],
      fashions: [],
      phones: [],
      homes: [],
      electronics: [],
      settings: {},
    };
  }

  componentDidMount() {
    homeServices.getSiteSettings()
        .then((data) => {
          if (data && data.data) {
            const { data: siteData } = data;
            this.setState({
              settings: siteData,
              sliders: siteData.sliders[0].sliders || []
            });
          } else {
            console.log("No data received from homeServices.getSiteSettings");
          }
        })
        .catch((err) => {
          console.log(err);
        });


    homeServices.getAllCats().then(
      (data) => {
        this.setState({
          cats: data.data,
        });
        homeServices.getByCatName().then(
          (data) => {
            this.setState({
              suerpMarkets: data.data[0],
              fashions: data.data[1],
              phones: data.data[2],
              homes: data.data[3],
              electronics: data.data[4],
            });

          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );

    homeServices.getAllProducts().then(
      (data) => {
        this.setState({
          products: data.data,
        });
      },
      (err) => {
        console.log(err);
      }
    );

  }

  render() {
    const iconProducts = data.iconProducts;
    const rows = [...Array(Math.ceil(iconProducts.length / 4))];
    const productRows = rows.map((row, idx) =>
      iconProducts.slice(idx * 40, idx * 40 + 40)
    );
    const carouselContent = productRows.map((row, idx) => (
      <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
        <div className="row g-3">
          {row.map((product, idx) => {
            const ProductImage = this.components[product.img];
            return (
              <div
                key={idx}
                className="col-md-3"
                onClick={(e) => setProductCat(e.target.value)}
              >
                <CardIcon
                  title={product.title}
                  text={product.text}
                  tips={product.tips}
                  to={product.to}
                >
                  <ProductImage className={product.cssClass} />
                </CardIcon>
              </div>
            );
          })}
        </div>
      </div>
    ));
    function setProductCat(catNAme) {
      console.log("catName", catNAme);
      return catNAme;
    }

    return (
      <React.Fragment>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-2">
              <TopMenu data={this.state.cats} />
            </div>
            <div className="col-md-8">
              <Banner
                className="mb-3"
                id="carouselHomeBanner"
                data={this.state.sliders}
                onClick={(e) => setProductCat(e.target)}
              />
            </div>
          </div>
        </div>
        <br />

        <div className="container mb-3">
          {/*<div className="row">
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaMall_.png"
                  style={{ width: "40px" }}
                />
                <a target="_blank" href="https://www.jumia.com.eg/jumia-mall/">
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("offical")}
                  </b>
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaGlobal.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://www.jumia.com.eg/mlp-jumia-global/"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("jumiaGlobal")}
                  </b>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/JumiaOne_1.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://pay.jumia.com.eg/services/recharge?utm_source=jumia&utm_medium=mall&utm_campaign=Teaser"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("jumiaDoniation")}
                  </b>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <img
                  src="https://eg.jumia.is/cms/QuickLinks/Artboard_1222.png"
                  style={{ width: "40px" }}
                />
                <a
                  target="_blank"
                  href="https://www.jumia.com.eg/sp-orange-redemption/"
                >
                  <b style={{ position: "absolute", right: "11%", top: "31%" }}>
                    {this.props.trans("orangePoints")}
                  </b>
                </a>
              </div>
            </div>
          </div>*/}
        </div>

        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <div className="card p-2">
                <div className="card-header bg-warning">
                  <h4>{this.props.trans('superMarket')}</h4>
                </div>
                <Slider data={this.state.suerpMarkets} />
              </div>
            </div>
          </div>
        </div>

       


        {/*<div className="container">
          <div className="row">
            {this.state.two_img_ad.map((item) => (
              <div className="col-md-6">
                <div className="card">
                  <img src={item} />
                </div>
              </div>
            ))}
          </div>
        </div>*/}
        <section className="container mt-2 mb-2" style={{ fontSize: "12px" }}>
          <div className="card p-3">
            <div className="markup -pvs">
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const HomeView = () => {
  const { t } = useTranslation();
  return <HomeViewClass trans={t} />;
};

export default HomeView;
