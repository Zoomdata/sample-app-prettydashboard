import React from 'react';
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import NoData from '../NoData';
import LoaderData from '../LoaderData';
import Tree  from './config';

const mapStateToProps = (state) => {
    return {
        data: state.chartData.tmapEventData.data,
        tmap: state.chartData.tmapEventData,
        metric: state.chartFilters.mapmetric,
        zoom: state.dashboard.zoom,
    }
};

class TreeMapEvent extends React.Component{

    loadTreeMap(tmap, echartobj, width, height, type, zoom, metric){
      if (!tmap.data) {
            return (<LoaderData />);
      }
      else if(tmap.data.length == 0){
            return(<NoData height={height}/>) ;
      }
      else {
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
                    {this.loadTreeMap(this.props.tmap, 
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
