import React from "react";
import { Dropdown } from 'react-bootstrap';
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

  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    setUserName(props.userName);
    props.getUserInfo();
  }, [setUserName, props.totalItem, props.userName, props.userLogin]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <div
        className="reg"
        style={{ width: "100%", background: "#232323", textAlign: "center" }}
      >
        <img
          src={fegusplacecoverimage}
          // style={{ width: "225vh", height:"20vh", margin: "auto" }}
          style={{ maxWidth: '100%', maxHeight: '2in', width: '100%', height: 'auto' }}
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
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className="border mr-3" id="dropdown-basic">
                    <i className="fa fa-user mr-1"></i>
                    {props.user.name ? props.user.name : `${t("login")}`}
                    <i className="fa fa-arrow-down ml-1"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {props.user.name ? (
                        <Dropdown.Item as={Link} to="/account/orders">
                          <IconPersonBadgeFill /> My Profile
                        </Dropdown.Item>
                    ) : (
                        <>
                          <Dropdown.Item as={Link} to="/account/login">
                            {t("login")} <i className="fa fa-sign-in-alt" />
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/account/signup">
                            {t("createAccount")} <i className="fa fa-plus" />
                          </Dropdown.Item>
                        </>
                    )}
                    {props.user.name && (
                        <>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={logOut}>
                            <IconDoorClosedFill className="text-danger" /> Logout
                          </Dropdown.Item>
                        </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="btn-group">
                <LanguageSwitcher />
              </div>

              <div className="position-relative d-inline ml-2">
                <Link to="/cart" className="btn btn-secondary" style={{ color: 'secondary' }}>
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo: () => {
      dispatch({ type: "GET_INFO" });
    },
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.productReducer.userInfo,
    totalItem: state.productReducer.items,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
