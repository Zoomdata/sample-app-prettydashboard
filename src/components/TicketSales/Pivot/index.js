import React from 'react';
import { connect } from 'react-redux';
import NoData from '../NoData';
import LoaderData from '../LoaderData';
import Pivot from './config';

const mapStateToProps = (state) => {

    var result;
    if (state.chartData.pivotData === undefined) {
      result = undefined;
    } else {
      result = state.chartData.pivotData.data;
    }
    return {
        data: result,
        zoom: state.dashboard.zoom,
        filter: state.dashboard.tableFilter,
        categories: state.chartFilters.categories,
    }
};

const loadTable = (data, filter, height, width) => {
  if (!data) {
        return (<LoaderData />) ;
  } 
  else if(data.length == 0){
        return(<NoData height={height}/>) ;
  }
  else {
    return (
        <Pivot  items={data} 
                filter={filter} 
                height={height} 
                width={width} />
    );
  }
}

class VisiblePivot extends React.Component{
    render() {
        let height = this.props.height - 90;
        let width = (23 * this.props.width) / 100; 
        if(this.props.zoom == 'PIVOT')
            {
                height = 510;
                width =  300 
            }
        return (
            <div className='table'>
                      {loadTable(this.props.data, this.props.categories, height, width)}
                </div>
        );
    }

}

export default connect(mapStateToProps)(VisiblePivot);
