import TechvalensLogo from "../../Utils/Img/Techvalens_logo_g-1.png";
import techvalensIcon from "../../Utils/Img/Techvalens_icon_a-1.png";
import "./header.scss";
const Header = () => {
  return (
    <div>
      <div className="container-fluid main-header">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <div className="headerDiv">
                  <a className="navbar-brand" href="#">
                    <img className="techLogo" src={TechvalensLogo} alt="" />
                  </a>
                </div>
                <ul className="navbar-nav m-auto ">
                  <h2 className="HeaderHeading">
                    ATTENDANCE MANAGEMENT SYSTEM
                  </h2>
                </ul>
                <div
                  className=""
                  id="navbarSupportedContent"
                >
                  <div className="tech-icon">
                    <img src={techvalensIcon} alt="" />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
