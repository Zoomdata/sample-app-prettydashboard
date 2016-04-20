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
    }
};

const loadDonut = (data, onClick) => {
  var height = 410;
  var width = 350;
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
        <div style={{margin:'auto', width:'80%', paddingLeft:'30px'}}>
          <Donut 
            items={data}
            width={width}
            height={height}
            onClick={onClick}
          />
        </div>
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
                  {loadDonut(this.props.data, this.props.onClick)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleDonut);
