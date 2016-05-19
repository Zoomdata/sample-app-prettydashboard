import React from 'react';
import './style.css';
import Widgets from '../Widget';
import WidgetDetails from '../WidgetDetails';
import DashboardMenu from '../DashboardMenu';
import { connect } from 'react-redux';
import $ from 'jquery';
class Dashboard extends React.Component{

    render(){
        return (
                    <div className="row row-container">
                        <div align="left" id="col s10">
                            <div className="gridster" id="gridcontainer" >
                                <ul>
                                    <DashboardMenu/>
                                    {this.props.widgets.map((w, i) => {
                                        return (
                                                <Widgets 
                                                    key={i}
                                                    id={w.id}
                                                    drow={w.drow}
                                                    dcol={w.dcol}
                                                    dsizex={w.dsizex}
                                                    dsizey={w.dsizey}
                                                    height={w.height} 
                                                    width={w.width} 
                                                    name={w.name}
                                                    type={w.type}
                                                    data={w.data}
                                                    dispatch={this.props.dispatch}
                                                />
                                        )})
                                      }
                                </ul>
                            </div>
                        </div>
                        <WidgetDetails
                            dispatch={this.props.dispatch}
                            name={this.props.name}
                            zoom={this.props.zoom}/>
                </div>
              );
    }
}


const mapStateToProps = (state) => {
    return {
        widgets: state.dashboard.widgets,
        zoom: state.dashboard.zoom,
        name: state.dashboard.name,
        initial: state.dashboard.initial,
    }
}

export default connect(mapStateToProps)(Dashboard)
