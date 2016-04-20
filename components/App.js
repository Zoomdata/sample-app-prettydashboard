import React from 'react';
import Widgets from './Widget';
import AddWidgetButton from './AddWidgetButton';
import ZoomWidget from './ZoomWidget';
import { connect } from 'react-redux';
class Dashboard extends React.Component{

    render(){
        return (
            <div>
                <div className="container" align="left">
                    <div className="gridster" onClick={this.handleClick}>
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
                    zoom={this.props.zoom}/>
            </div>
              );
    }
}


const mapStateToProps = (state) => {
    return {
        widgets: state.dashboard.widgets,
        zoom: state.dashboard.zoom,
    }
}

export default connect(mapStateToProps)(Dashboard)
