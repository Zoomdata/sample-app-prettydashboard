import React from 'react';
import Widget from './Widget';
import AddWidgetButton from './AddWidgetButton';
import DetailsView from './DetailsView';
import ReactGridLayout from 'react-grid-layout';
import $ from 'jquery';
import { resizeWidget } from '../redux/actions';
import { connect } from 'react-redux';

class DashboardLayout extends React.Component{

    handleResize(layout, oldLayoutItem, layoutItem, placeholder, e){
        let grid = document.getElementById('grid-'+layoutItem.i)
        this.props.dispatch(resizeWidget({
               id: layoutItem.type,
               width: grid.offsetWidth,
               height: grid.offsetHeight - 30
        }))
    }

    render(){
        return ( <div>
                    <ReactGridLayout 
                        className="layout" 
                        layout={this.props.widgets} 
                        draggableHandle={'section, section *'}
                        cols={12} 
                        verticalCompact={true}
                        onResizeStart={this.handleResize.bind(this)}
                        onResize={this.handleResize.bind(this)}
                        onResizeStop={this.handleResize.bind(this)}
                        rowHeight={30} 
                        width={1200}>
                        { this.props.widgets.map((w) => {
                            return (
                                <div key={w.i} id={'grid-'+w.i} className="grid-item">
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
                    <DetailsView
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

export default connect(mapStateToProps)(DashboardLayout)
