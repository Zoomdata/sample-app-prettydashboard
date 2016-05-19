import React from 'react';
import './style.css';
import NoData from '../NoData';
import LoaderData from '../LoaderData';
import KPI from './config';
import {connect} from 'react-redux';

class VisibleKPI extends React.Component{

    loadKPIs(kpidata, type, width, height, categories ){
        if (kpidata.data == undefined){ 
            return (<LoaderData />) ;
        }
        else if(kpidata.data[0].current.count == 0) { 
            return(<NoData height={height}/>) ;
        } 
        else {
            return (
                    <KPI
                        totals={kpidata.data}
                        fetching={kpidata.isFetching}
                        width={width}
                        height={height - 50}
                        kpi={type}
                        categories={categories}
                    />
            );
      }
    }

    render() {
        return (
                <div>
                    {this.loadKPIs(this.props.kpidata, 
                                   this.props.type, 
                                   this.props.width,
                                   this.props.height,
                                   this.props.categories)}
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
