import React from 'react';
import logo from '../../images/zd-logo.png';
import CategoriesCheck from './categoriesCheck';
import UserSelect from './userSelect';
import { connect } from 'react-redux';
import {states} from './states';
import _ from 'lodash';
import './style.css';
let STATE = 'STATE';
let CITY = 'CITY';


/* This component is an special widget used as menu. It is single <li> tag
 * and also render:
 * <CategoriesCheck/> (Categories checkboxs filters)
 * Two instances of <UserSelect>, one for the States and other for the Cities
*/
class DashboardMenu extends React.Component{

    /*
    This function creates the states array matching those obtained
    from ZD and the stored on states.js (since no state name is provided, only ISO2). 
    Also creates the arrays of cities specified for each obtained state
    */
    getUserData(ustate, data){
        let zdStates = [{name:'Venue State', code: 0}];
        let cities = [{name:'Venue City', code: 0}];
        let usedZdStates = []
        if(data){
          _(data).forEach(function(item){
              let s = item.group[0]
              if(s !== null){
                  let stateName = (states[s] == undefined) ? s : states[s]
                  if(usedZdStates.indexOf(s) == -1){
                      zdStates.push({code: s, name: stateName})
                      usedZdStates.push(s)
                  }
                  if (item.group[0] == ustate) {
                      cities.push({name: item.group[1], code: item.group[1]})
                  }
              }
          })
        }
        return {states: zdStates, cities: cities};
    }

    render(){
        let attr = { id:'MENU', row: 1, col: 1, sizex: 18, sizey: 1 };
        let data = this.getUserData(this.props.ustate, this.props.data);
        return( <li id={attr.id}
                      className="grid-li"
                      data-row={attr.row}
                      data-col={attr.col}
                      data-sizex={attr.sizex}
                      data-sizey={attr.sizey}>
                      <div className="card card-panel dark-grey">
                          <div className="dash-menu">
                              <div className="logo">
                                  <section style={{cursor:'move'}}>
                                    <div className="logo">
                                        <img src={logo}/>
                                    </div>
                                  </section>
                              </div>
                              <div className="filters">
                              <UserSelect 
                                  type={STATE}
                                  ustate={this.props.ustate}
                                  city={this.props.city}
                                  dispatch={this.props.dispatch}
                                  options={data.states} />
                              <UserSelect 
                                  type={CITY}
                                  ustate={this.props.ustate}
                                  city={this.props.city}
                                  dispatch={this.props.dispatch}
                                  options={data.cities} />
                               <CategoriesCheck/>
                              </div>
                          </div>
                      </div>
                </li>
              )
    }
}

const mapStateToProps = (state) => {
    return { 
        data: state.chartData.stateData.data,
        ustate: state.chartFilters.userstate,
        city: state.chartFilters.usercity
    }
};

export default connect(mapStateToProps)(DashboardMenu);
