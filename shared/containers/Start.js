import React from 'react';
import Navbar from '../components/Navbar';

class Start extends React.Component {
    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1>Start</h1>
                    {this.props.children}
                    <div id="loginbox" className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    </div>
                </div>
            </div>
        );
    }
}

export default Start;
