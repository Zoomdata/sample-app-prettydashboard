import React from 'react';
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import { setTrendLoanGrade, setTrendLoanStatus, setTrendEmpLength, changeTrendFilter} from '../redux/actions'
import Trend  from './Trend';
import _ from 'lodash/core';

const mapDispatchToProps = (dispatch) => {
  return {
    onEmpLengthSelected: (event, href, eventKey) => {
        var eventObj = {
            targetId: event.target.id,
            selected: event.target.checked
        }
        dispatch(setTrendEmpLength(eventObj));
        dispatch(changeTrendFilter()); 
    }, 
    onGradeSelected: (event) => {
      dispatch(setTrendLoanGrade(event.target.id));
      dispatch(changeTrendFilter());
    },
    onStatusSelected: (event) => {
      dispatch(setTrendLoanStatus(event.target.id));
      dispatch(changeTrendFilter());
    },
    onClick: (param) => {
      		// TODO: add hook for trend chart events
    }
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.chartData.trendData.data,
        grades: state.chartData.gradeData.data,
        filters: state.chartFilters,
        zoom: state.dashboard.zoom,
    }
};

var controlStyle = {
  paddingLeft: '70',
  paddingTop: '20'
};

const loadTrend = (data, width, height, onClick, type, zoom) => {
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
        <Trend 
          items={data}
          type={type}
          width={width}
          height={height}
          zoom={zoom}
          charopts={chartOpts}
          onClick={onClick}
        />
    );
  }
}

class VisibleTrend extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = { 
            heightMod: -50,
            widthMod: 210
        };
    }

    render(){
        let height = this.props.height - 50;
        let width = this.props.width - 20;
        if(this.props.zoom == 'TREND')
            {
                height = 550;
                width = 1100
            }
        return(
            //jsx code
                <div className="trend">
                    {loadTrend(this.props.data, width, height, this.props.onClick, this.props.type, this.props.zoom)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleTrend);
