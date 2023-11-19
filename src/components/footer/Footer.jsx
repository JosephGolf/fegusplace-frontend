import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import fegusplace from "../../assets/fegusplace.jpg";



export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-darker">
        <div className="container">
          <div className="row py-3 mt-5">
            <div className="col-md-2 col-sm-6">
              <img src={fegusplace} className="img-fluid"/>
            </div>
            <div className="col-md-6 col-sm-6">
              <h6>
                <b>New To Fegus Place ?</b>
              </h6>
              <p>
                <small>
                  {t('subcsribeMesg')}
                </small>
              </p>
              <form className="form-inline my-lg-0">
                <input
                  className=" search form-control mr-sm-2"
                  type="search"
                  placeholder='Write your email'
                  aria-label="Search"
                />
              
              </form>
            </div>

            <div className="col-md-4 col-sm-6">
              <h6>
                <b>Download FegusPlace App</b>
              </h6>
              <p>
                <small>{t('getAccess')}</small>
              </p>

              <a target="_blank" href="#" className="btn btn-outline-light mr-2">
                <i className="fab fa-app-store"></i> App Store
              </a>
              <a target="_blank" href="#" className="btn btn-outline-light">
                <i className="fab fa-google-play"> </i> Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darke text-white">
        <div className="container">
          <div className="row py-3">
            <div className="col-md-3 col-sm-6">
              <h6>
                <b> {t('letUsHelpU')} </b>
              </h6>
              <ul className="p-0">
                <li className="f-li"></li>
                <li className="f-li"><Link to="/contact-us">{t('helpCenter')}</Link></li>                
                <li className="f-li"><Link to="/contact-us">{t('contactUs')}</Link></li>
                <li className="f-li"><Link to="/privacy">{t('privacy')}</Link></li>
                <li className="f-li"><Link to="/shp-delivery-policy">{t('shipDP')}</Link></li>                                
                <li className="f-li"><Link to="/terms-condtions">{t('termsAndCondtion')}</Link></li>                
                <li className="f-li"><a href="#">{t('reportAPro')}</a></li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h6>
                <b> About Fegus Place </b>
              </h6>
              <ul className="p-0">
                <li className="f-li"> </li>
                <li className="f-li">How to Pay </li>
                <li className="f-li"> {t('returnPolicy')}</li>           
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h6>
                <b> Make Money With FegusPlace </b>
              </h6>
              <ul className="p-0">
                <li className="f-li">Sell On FegusPlace</li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              {/*<h6>
                <b> {t('jumiaInterNational') }</b>
              </h6>
              <ul className="p-0">                
                <li className="f-li"> {t('Algeria')}</li>
                <li className="f-li"> {t('Ghana')}</li>
                <li className="f-li"> {t('Kenya')}</li>
                <li className="f-li"> {t('Morocco')}</li>
              </ul>*/}
            </div>
            <div className="col-md-3 col-sm-6">
              <h6>
                <b>{t('joinUs')}</b>
              </h6>
              <p>
                <span className=" text-white rounded-circle px-2 py-1">
                  <i className="fab fa-facebook"></i>
                </span>
                <span className=" text-white rounded-circle px-2 py-1">
                  <i className="fab fa-twitter"></i>
                </span>
                <span className=" text-white rounded-circle px-2 py-1">
                  <i className="fab fa-youtube"></i>
                </span>
                <span className=" text-white rounded-circle px-2 py-1">
                  <i className="fab fa-instagram"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
