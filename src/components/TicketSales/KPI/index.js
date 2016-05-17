import React from 'react';
import './style.css';
import KPI from './config';
import {connect} from 'react-redux';

class VisibleKPI extends React.Component{

    loadKPIs(kpidata, type, categories ){
      if (kpidata.data == undefined) {
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
                <KPI
                    totals={kpidata.data}
                    fetching={kpidata.isFetching}
                    kpi={type}
                    categories={categories}
                />
        );
      }
    }

    render() {
        return (
                <div>
                  {this.loadKPIs(this.props.kpidata, this.props.type, this.props.categories)}
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    let props = {
        kpidata: state.chartData.kpiTotalData,
        zoom: state.dashboard.zoom,
        categories: state.chartFilters.categories,
    }
    return props
};

export default connect(mapStateToProps)(VisibleKPI);
