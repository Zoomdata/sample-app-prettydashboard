import React from 'react';
import { connect } from 'react-redux';
import KPIs from './KPIs';


var kpisBlockStyle = {
  paddingLeft: '0',
  paddingTop: '0',
  paddingRight: '0'
};

class VisibleKPIs extends React.Component{

    loadKPIs(data, height, width, totals, filters, type){
      if (totals == undefined) {
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
                <KPIs 
                  items={data}
                  totals={totals}
                  filters={filters}
                  charopts={chartOpts}
                  width={width}
                  height={height}
                  zoom={this.props.zoom}
                  type={type}
                />
        );
      }
    }

    render(){
        var height = 200;
        var width = 200;
        console.log(this.props.zoom);
        if(this.props.zoom.indexOf('KPI') > -1)
            {
                height = 550;
                width = 1100;
            }
        return(
                <div style={kpisBlockStyle}>
                  {this.loadKPIs(this.props.data, height, width, this.props.totals, this.props.filters, this.props.type)}
                </div>
              )
    }
}

const mapStateToProps = (state) => {
    var totals;
    if (state.chartData.kpiTotals === undefined) {
      totals = undefined;
    } else {
      totals = state.chartData.kpiTotals.data;
    }
    return {
        data: state.chartData.kpiData.data,
        totals: totals,
        filters: state.chartFilters,
        zoom: state.dashboard.zoom,
    }
};

export default connect(mapStateToProps)(VisibleKPIs);
