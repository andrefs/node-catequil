import React from 'react';
import Navbar from '../components/Navbar';

class Start extends React.Component {
    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Start;
