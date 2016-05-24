import React from 'react';
import './style.css';
import MetricSelect  from '../TicketSales/TreeMap/metricSelect';
import { closeWidget, setChart } from '../../redux/actions';
import { connect } from 'react-redux';
import { light } from '../../utils/light-theme';

/*
  The WidegetHeader component is used as a header for each widget. It renders
  the different options (close, maximize and config) for each widget. Also contains
  the title of the widget and the mini-loading spinner indicator when a filter action
  is triggered and the data is being fetched.

  Also renders the MetricSelect component specific for the TreeMap since this component
  is the only one that contains the config option.
*/
class WidgetHeader extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {display: false};
    }

  setFullScreen(){
    this.props.dispatch(setChart(this.props.id));
  }

  setOptions(){
    let current = this.state.display;
    this.setState({display: !current})
  }

  displaySettings(){
      if(this.state.display){
      return( 
              <div className="widget-options" align="center">
                  <MetricSelect
                      dispatch={this.props.dispatch}
                  />
              </div>
            )
      }
  }

  deleteWidget(){
    this.props.dispatch(closeWidget(this.props.id));
  }

  showLoader(querydata, qd){
      if(qd && querydata[qd].isFetching && querydata[qd].data != undefined){
          return( <div className="preloader-wrapper smaller active">
                      <div className="spinner-layer spinner-grey">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                  </div>
                )
      }
  }

  setBtnConfig(options){
      if(options.config){
          return ( <a href="#" 
                        onClick={this.setOptions.bind(this)}>
                        <i className="material-icons md-light">settings</i>
                    </a>);
      }
  }
  setBtnFullScreen(options){
      if(options.zoom){
          return ( <a href="#modal1"
                        className="fullscr modal-trigger"
                        onClick={this.setFullScreen.bind(this)}>
                        <i className="material-icons md-light">open_in_new</i>
                    </a>
                 )
      }
  }
  setBtnDelete(options){
      if(options.delete){
          return ( <a href="#" className="del">
                        <i className="material-icons md-light">close</i></a>
                 )
      }
  }

    render(){
        return ( <div>
                      <section className="card-header">
                         <div className="chart-name">{this.props.name}</div>
                         {this.showLoader(this.props.querydata, this.props.data.querydata)}
                         {this.setBtnConfig(this.props.data.options)}
                         {this.setBtnFullScreen(this.props.data.options)}
                         {this.setBtnDelete(this.props.data.options)}
                        </section>
                        <div style={{float:'none'}}>
                            {this.displaySettings()}
                        </div>
                </div>
            
               );
    }
}

const mapStateToProps = (state) => {
    return { querydata: state.chartData }
}
export default connect(mapStateToProps)(WidgetHeader)
