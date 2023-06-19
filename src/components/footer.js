import React from "react"
import {Link} from "react-router-dom";
const Footer = () => {

return(
<footer className="text-black  pt-4 footer rounded" style={{backgroundColor:'#abebbb'}}>
    <div className="container-fluid text-center text-md-left ">
        <div className="row">
            <div className="col-md-4 mt-md-0 mt-3">
                <h5>About Us</h5>
                <p >Cheretanet refers to the use of digital technologies to enable a more efficient and transparent exchange of information, and interactions and transactions between government and the business community in the procurement of goods, services and works.</p>
            </div>
            <div className="col-md-2 mb-md-0 mb-3">
                <h5>Links</h5>
                <ul className="list-unstyled ">
                    <li><Link className="text-black fw-bold text-decoration-none" to="/">Home</Link></li>
                    <li><Link className="text-black fw-bold text-decoration-none" to="/about">About</Link></li>
                    <li><Link className="text-black fw-bold text-decoration-none" to="/advert">Advert</Link></li>
                </ul>
            </div>
            <div className="col-md-4 mb-md-0 mb-3">
                <h4 id="contact">Contact us</h4>
                <h6>FDRE Public Procurement and Property Authority</h6>
                <h6>6 killo In front of Yekatit 12 Referral Hospital</h6>
                <h6>P.O.Box 32387</h6>
                <h6>Addis Ababa, Ethiopia</h6>
                <h6>Phone: +251-111248617</h6>
                <h6>Fax: +251111248612 / +251111540120</h6>
            </div>
            <div className="col-md-2 mb-md-0 mb-3">
                <h5>Important Links</h5>
                <ul className="list-unstyled">
                    <li><Link className="text-black fw-bold " to="http://www.ppa.gov.et/" target='_blank'>www.ppa.gov.et</Link></li>
                    <li><Link className="text-black fw-bold text-docaration-none" to="https://www.mint.gov.et/" target='_blank'>www.mint.gov.et</Link></li>
                    <li><Link className="text-black fw-bold text-docaration-none" to="https://www.pmo.gov.et/" target='_blank'>www.pmo.gov.et</Link></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">&copy; {new Date().getFullYear()} Copyright
       FPPA
    </div>

</footer>)
}
export default Footer