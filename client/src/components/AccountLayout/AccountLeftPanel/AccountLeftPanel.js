import React, { Component } from 'react';
import Footer from '../Register/Footer/Footer';
import './AccountLeftPanel.css';

export class AccountLeftPanel extends Component {
    render() {
        return (
            <div className="left-panel flex flex-col justify-between h-full">
                <Footer />
            </div>
        )
    }
}

export default AccountLeftPanel;
