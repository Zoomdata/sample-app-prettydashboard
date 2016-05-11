import React from 'react';
import Counter from 'react-counter';
import './style.css';
import KPI from './config';
import {connect} from 'react-redux';

class VisibleKPI extends React.Component{

    loadKPIs(totals, type, categories ){
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
                <KPI
                    totals={totals}
                    kpi={type}
                    categories={categories}
                />
        );
      }
    }





    render() {
        return (
                <div>
                  {this.loadKPIs(this.props.totals, this.props.type, this.props.categories)}
                </div>
        );
    }

}

const mapStateToProps = (state) => {
    let props = {
        totals: state.chartData.kpiTotalData.data,
        zoom: state.dashboard.zoom,
        categories: state.chartFilters.categories,
    }
    return props
};

export default connect(mapStateToProps)(VisibleKPI);
