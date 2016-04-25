import React from 'react';
import Widgets from './Widget';
import AddWidgetButton from './AddWidgetButton';
import ZoomWidget from './ZoomWidget';
import { connect } from 'react-redux';
import $ from 'jquery';
class Dashboard extends React.Component{

    render(){
        return (
            <div>
                <div className="container" align="left">
                    <div className="gridster">
                        <ul>
                            { this.props.widgets.map((w, i) => {
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
                                                dispatch={this.props.dispatch}
                                            />
                                    )})
                            }
                        </ul>
                    </div>
                </div>
                <AddWidgetButton dispatch={this.props.dispatch}/>
                <ZoomWidget
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
