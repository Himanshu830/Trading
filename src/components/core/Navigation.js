import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navigation = ({ userId, history }) => (
    <div className="col-3">
        <div className="card">
                <h4 className="card-header">User</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile`}>
                            Profile
                        </Link>
                    </li>  
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/company`}>
                            Company
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/product`}>
                            Product
                        </Link>
                    </li>
                </ul>
            </div>
    </div>
);

export default withRouter(Navigation);
