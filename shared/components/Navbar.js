import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-fixed-top">
                <div className="navbar-header">
                    <Link className="navbar-brand pull-left" to={"#"}>
                        <div className="logo"></div> Catequil
                    </Link>
                </div>
        </nav>
    );
  }
}

export default Navbar;
