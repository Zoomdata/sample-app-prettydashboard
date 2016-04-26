import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { setLoanGrade } from '../redux/actions'
import Donut  from './Donut';
import LoadingDataDiv from './LoadingDataDiv';

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

const loadDonut = (data, onClick, type, zoom, height, width) => {
  if(zoom == 'DONUT')
    {
        height = 550;
        width = 1100;
     }
     if (!data) { 
         return (<LoadingDataDiv height={height} width={width}/>)
     } 
     else {
        return (
              <Donut 
                items={data}
                width={width}
                height={height}
                onClick={onClick}
                type={type}
                zoom={zoom}
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
        let height = this.props.height  //410;
        let width = this.props.width//620;
        return(
                <div>
                  {loadDonut(this.props.data, this.props.onClick, this.props.type, this.props.zoom, height, width)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleDonut);
