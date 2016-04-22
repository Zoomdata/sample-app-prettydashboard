import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { setLoanGrade } from '../redux/actions'
import Donut  from './Donut';

let prevSelection = 'All';

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (param) => {
      var currentSelection = param.data.selected 
                              ? param.data.name[0] : 'All';

    	if (currentSelection !==  prevSelection) {
    		prevSelection = currentSelection;
        dispatch(setLoanGrade(currentSelection))
      }
    }
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.chartData.gradeData.data,
        zoom: state.dashboard.zoom,
    }
};

const loadDonut = (data, onClick, type, zoom) => {
  var height = 410;
  var width = 620;
  if(zoom == 'DONUT')
    {
        height = 550;
        width = 1100;
     }
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
          <Donut 
            items={data}
            width={width}
            height={height}
            onClick={onClick}
            type={type}
            zoom={zoom}
            charopts={chartOpts}
          />
    );
  }
}

var labelStyle = {
  margin: 'auto',
  width: '30%'
};

class VisibleDonut extends React.Component{
    render(){
        return(
                <div>
                  {loadDonut(this.props.data, this.props.onClick, this.props.type, this.props.zoom)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleDonut);
