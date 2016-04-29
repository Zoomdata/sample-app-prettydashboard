import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';
import AddWidgetButton from './AddWidgetButton';
import DetailsView from './DetailsView';
import ReactGridLayout from 'react-grid-layout';
import { resizeWidget, setChartUpd } from '../redux/actions';
import { getItem } from '../utils/tools';
import { connect } from 'react-redux';

class DashboardLayout extends React.Component{

    resizeGrids(id, type, height, width, dispatch){
        if(id){
            let grid = document.getElementById('grid-'+id)
            let nw = grid.offsetWidth
            let nh = grid.offsetHeight
            if (width !== nw || height !== (nh - 20)) {
                dispatch(resizeWidget({
                       id: type,
                       width: nw,
                       height: nh - 20
                }))
            }
        }
    }

    handleResize(layout, oldLayoutItem, layoutItem, placeholder, e){
        this.props.dispatch(setChartUpd(layoutItem.i)) 
        this.resizeGrids(layoutItem.i, 
                         layoutItem.type, 
                         layoutItem.height,
                         layoutItem.width,
                         this.props.dispatch)
    }

    componentDidMount() {
        this.props.widgets.forEach(function(w){
            this.resizeGrids(w.i, w.type, w.height, w.width, this.props.dispatch)
        }.bind(this))
    }

    componentDidUpdate(prevProps, prevState) {
        let item = getItem(this.props.widgets, this.props.toupd)
        this.resizeGrids(item.i, item.type, item.height, item.width, this.props.dispatch)
    }

    render(){
        return ( <div>
                    <ReactGridLayout 
                        className="layout" 
                        layout={this.props.widgets} 
                        draggableHandle={'section, section *'}
                        cols={82} 
                        verticalCompact={true}
                        onResize={this.handleResize.bind(this)}
                        onResizeStop={this.handleResize.bind(this)}
                        rowHeight={30} 
                        width={8200}>
                        { this.props.widgets.map((w) => {
                            return (
                                <div key={w.i} id={'grid-'+w.i} 
                                    className="grid-item" >
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
        toupd: state.dashboard.toupd,
        name: state.dashboard.name,
        initial: state.dashboard.initial,
    }
}

export default connect(mapStateToProps)(DashboardLayout)
