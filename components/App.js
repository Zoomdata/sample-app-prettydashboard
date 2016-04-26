import React from 'react';
import Widget from './Widget';
import AddWidgetButton from './AddWidgetButton';
import ZoomWidget from './ZoomWidget';
import ReactGridLayout from 'react-grid-layout';
import { connect } from 'react-redux';

class Dashboard extends React.Component{

    onResize(layout, oldLayoutItem, layoutItem, placeholder, e){
        let elem = document.getElementById(layoutItem.i)
        console.log(elem.offsetHeight);
        console.log(elem.offsetWidth);
    }

    render(){
        return ( <div>
                    <ReactGridLayout 
                        className="layout" 
                        layout={this.props.widgets} 
                        draggableHandle={'section, section *'}
                        cols={12} 
                        onResize={this.onResize}
                        rowHeight={30} 
                        width={1200}>
                        { this.props.widgets.map((w) => {
                            return (
                                <div key={w.i}>
                                    <Widget id={w.i}
                                       dsizex={w.x}
                                       dsizey={w.y}
                                       height={w.height} 
                                       width={w.width} 
                                       name={w.name}
                                       type={w.type}
                                       dispatch={this.props.dispatch}/>
                                </div>
                            )})
                        }
                    </ReactGridLayout>
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
