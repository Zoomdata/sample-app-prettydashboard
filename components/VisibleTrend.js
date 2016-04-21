import React from 'react';
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
        theme: state.dashboard.theme
    }
};

var controlStyle = {
  paddingLeft: '70',
  paddingTop: '20'
};

const loadTrend = (data, width, height, onClick, type, theme) => {
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
          theme={theme}
          charopts={chartOpts}
          onClick={onClick}
        />
    );
  }
}

class VisibleTrend extends React.Component{
    render(){
        var height = 350;
        var width = 610;
        return(
            //jsx code
                <div className="trend">
                    {loadTrend(this.props.data, width, height, this.props.onClick, this.props.type, this.props.theme)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleTrend);
