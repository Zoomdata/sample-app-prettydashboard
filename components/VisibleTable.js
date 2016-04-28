import React from 'react';
import { connect } from 'react-redux';
import Pivot from './Pivot';
import image from '../images/loading.gif';

const mapStateToProps = (state) => {

    var result;
    if (state.chartData.pivotData === undefined) {
      result = undefined;
    } else {
      result = state.chartData.pivotData.data;
    }

    return {
        data: result
    }
};

const loadTable = (data) => {
  if (!data) {
    return (
        <div style={{paddingTop: 145, paddingLeft: 370}} ><img src={image} /></div>
    );
  } else {
    return (
        <Pivot 
          items={data}
        />
    );
  }
}

const VisibleDetails = ({
	data
}) => {
    return (
        <div className='row'>
          <div className='col-md-12'>
              {loadTable(data)}
          </div>
        </div>
    )
};

export default connect(mapStateToProps)(VisibleDetails);