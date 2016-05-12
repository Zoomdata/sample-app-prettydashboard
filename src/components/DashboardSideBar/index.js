import React from 'react';
import './style.css';
import logo from '../../images/zd-logo.png';
import CategoriesCheck from './categoriesCheck';
import ViewSelect from './viewSelect';
import MonthSelect from './monthSelect';

class DashboardSideBar extends React.Component{

    render() {
        return (
            <div className="col s2 sidebar" id="sidebar">
                <div> 
                    <div className="logo">
                        <img src={logo}/>
                    </div>
                    <CategoriesCheck/>
                </div>
            </div>
        );
    }

}
export default DashboardSideBar
