import React from "react"
import {Link} from "react-router-dom";
const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer Content</h5>
                <p>Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/advert">Advert</Link></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Important Links</h5>
                <ul className="list-unstyled">
                    <li><Link to="http://www.ppa.gov.et/">www.ppa.gov.et</Link></li>
                    <li><Link to="https://www.mint.gov.et/">www.mint.gov.et</Link></li>
                    <li><Link to="https://www.pmo.gov.et/">www.pmo.gov.et</Link></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <Link to="#"> FPPA</Link>
    </div>

</footer>

export default Footer