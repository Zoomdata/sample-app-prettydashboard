import React from 'react';
import { connect } from 'react-redux';
import Pivot from './Table';

const mapStateToProps = (state) => {

    var result;
    if (state.chartData.pivotData === undefined) {
      result = undefined;
    } else {
      result = state.chartData.pivotData.data;
    }

    return {
        data: result,
        zoom: state.dashboard.zoom
    }
};

const loadTable = (data, height, width) => {
  if (!data) {
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
        <Pivot  items={data} 
                height={height} 
                width={width} />
    );
  }
}

class VisibleTable extends React.Component{
    render() {
        let height = this.props.height - 90;
        let width = (23 * this.props.width) / 100; 
        if(this.props.zoom == 'TABLE')
            {
                height = 510;
                width =  260 
            }
        return (
                <div className='table'>
                      {loadTable(this.props.data, height, width)}
                </div>
        );
    }

}

export default connect(mapStateToProps)(VisibleTable);
