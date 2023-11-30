import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { connect } from "react-redux";
import fegusplace from "../fegusplace.jpg";
import fegusplacecoverimage from "../fegusplacecoverimage.png";

const Header = (props) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(props.user.name);
    props.getUserInfo();
  }, [setUserName, props.totalItem, props.userName, props.userLogin]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const renderProfileLink = () => (
      <Link className="dropdown-item" to="/account/orders">
        <IconPersonBadgeFill /> My Profile
      </Link>
  );

  const renderLoginLinks = () => (
      <>
        <li>
          <Link className="dropdown-item" to="/account/login">
            {t("login")} <i className="fa fa-sign-in-alt" />
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/account/signup">
            {t("createAccount")} <i className="fa fa-plus" />
          </Link>
        </li>
      </>
  );

  return (
      <React.Fragment>
        <div
            className="reg"
            style={{ width: "100%", background: "#232323", textAlign: "center" }}
        >
          <img
              src={fegusplacecoverimage}
              style={{ maxWidth: '100%', maxHeight: '2in', width: '100%', height: 'auto' }}
              alt="cover"
          />
        </div>

        <header className="p-3 border-bottom bg-light">
          <div className="container-fluid">
            <div className="row g-3">
              <div className="col-md-3 text-center">
                <Link to="/">
                  <img
                      alt="logo"
                      src={fegusplace}
                      style={{ width: "100px" }}
                  />
                </Link>
              </div>
              <div className="col-md-4">
                <Search />
              </div>
              <div className="col-md-5">
                <div className="btn-group">
                  <button
                      type="button"
                      className="btn btn-secondary border mr-3 dropdown-toggle1"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      aria-label="Profile"
                  >
                    <i className="fa fa-user mr-1"></i>
                    {props.user.name ? props.user.name : `${t("login")}`}
                    <i className="fa fa-arrow-down ml-1"></i>
                  </button>
                  <ul className="dropdown-menu">
                    {props.user.name ? renderProfileLink() : null}
                    <div className={props.user.name ? "d-none" : ""}>
                      {renderLoginLinks()}
                    </div>
                    {props.user.name ? <hr className="dropdown-divider" /> : null}
                    {props.user.name ? (
                        <li>
                          <Link
                              to="/"
                              className="dropdown-item"
                              onClick={logOut}
                          >
                            <IconDoorClosedFill className="text-danger" /> Logout
                          </Link>
                        </li>
                    ) : null}
                  </ul>
                </div>
                <div className="btn-group">
                  <LanguageSwitcher />
                </div>

                <div className="position-relative d-inline ml-2">
                  <Link
                      to="/cart"
                      className="btn btn-secondary"
                      style={{ color: 'secondary' }}
                  >
                    <IconCart3 className="i-va" />
                    <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle">
                      {props.totalItem > 0 ? props.totalItem : null}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch({ type: "GET_INFO" });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.productReducer.userInfo,
    totalItem: state.productReducer.items,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
