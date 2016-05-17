import React from 'react';
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import Tree  from './config';

const mapStateToProps = (state) => {
    return {
        data: state.chartData.tmapEventData.data,
        tmap: state.chartData.tmapEventData,
        metric: state.chartFilters.mapmetric,
        zoom: state.dashboard.zoom,
    }
};

const loadTreeMap = (tmap, echartobj, width, height, type, zoom, metric) => {
  if (!tmap.data) {
    return (
        <div className="loading">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
    );
  } else {
    return (
        <Tree 
          items={tmap.data}
          fetching={tmap.isFetching}
          echartobj={echartobj}
          type={type}
          width={width}
          metric={metric}
          height={height}
          zoom={zoom}
        />
    );
  }
}

class TreeMapEvent extends React.Component{

    render(){
        let height = this.props.height - 40;
        let width = this.props.width ;
        if(this.props.zoom == 'TREEMAPEVENT')
            {
                height = 550;
                width = 1110
            }
        return(
            //jsx code
                <div className="treemapevent">
                    {loadTreeMap(this.props.tmap, 
                               this.props.echartobj,
                               width, 
                               height, 
                               this.props.type, 
                               this.props.zoom,
                               this.props.metric)}
                </div>
              )
    }
}

export default connect(mapStateToProps)(TreeMapEvent);
