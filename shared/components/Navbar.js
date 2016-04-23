import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={"#"}>Catequil</Link>
                </div>
        </nav>
    );
  }
}

export default Navbar;
