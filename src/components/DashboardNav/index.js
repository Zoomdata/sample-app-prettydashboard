import React from 'react';
import './style.css';
class DashboardNav extends React.Component{
    constructor(state,context){
        super(state,context);
        this.state = {icon: 'menu'};
    }

    handleOnclick(){
        $("#sidebar").animate({width:'toggle'},350);
        //$(".open-menu").animate({width:'toggle'},350);
    }

    render() {
        return (
              <div className="header">
                  <a onClick={this.handleOnclick} href="#" className="open-menu">
                      <i className="open-menu material-icons">{this.state.icon}</i>
                  </a>
              </div>
        );
    }
}

export default DashboardNav
