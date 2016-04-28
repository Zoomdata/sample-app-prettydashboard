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
                  width={width}
                  height={height}
                  zoom={this.props.zoom}
                  type={type}
                />
        );
      }
    }

    render(){
        //let height = (this.props.height * 50) / 100
        //let width  = (this.props.width * 33) / 100
        let height = this.props.height
        let width  = this.props.width
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
        initial: state.dashboard.initial,
    }
};

export default connect(mapStateToProps)(VisibleKPIs);
