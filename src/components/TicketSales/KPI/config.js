import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './style.css';
var numeral = require('numeral');

class KPI extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {
            icon: 'trending_down', 
            iconclass: 'tdown material-icons',
            values: { nov:0, dec: 0},
            fetching: false,
        };
    }

    /* Based on the type of the widget (which is found in the file redux/reducers/dashboard.js)
       this function renders the respective KPI
       */
    createKpi(props){
        let kpi = this.props.kpi;
        let totals = (!props.totals) ? [] : props.totals
        let vals = { nov: 0, dec: 0 }
        totals.map(function (item) {
            if(kpi.indexOf('JAZZ') > -1){
                vals.nov =  item.current.metrics.calc_likes_jazz_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_jazz_december.calc * 100;
            } 
            else if(kpi.indexOf('ROCK') > -1){
                vals.nov =  item.current.metrics.calc_likes_rock_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_rock_december.calc * 100;
            }
            else if(kpi.indexOf('SPORTS') > -1){
                vals.nov =  item.current.metrics.calc_likes_sports_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_sports_december.calc * 100;
            }
        });
        vals.nov = numeral(vals.nov).format('0.00')
        vals.dec = numeral(vals.dec).format('0.00')
        return vals;
    }

    prepareRender(props, upd){
        let values = this.createKpi(props)
        let icon = (values.dec > values.nov) ? 'trending_up' : 'trending_down'
        let iconClass = (values.dec > values.nov) ? 'tup material-icons' : 'tdown material-icons'
        this.setState({
            icon: icon,
            iconclass: iconClass,
            values: values,
        })
    }

    /*
     Performs the KPI animation. This function is executed once the component
     is mounted since it uses jquery 
    */
    startKpiAnimation(){
          let kpi = $(ReactDOM.findDOMNode(this)).find('.kpidata');
          let value = this.state.values.dec
          $({counter: 0}).animate({counter: value}, {
              duration: 900,
              easing:'swing', // can be anything
              step: function() { // called on every step
                  kpi.html(numeral(this.counter).format('0.00'));
              }
          });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({fetching: this.props.fetching})
        this.prepareRender(nextProps, true);
    }
    componentWillMount() {
        this.prepareRender(this.props, false);
    }
    componentDidMount() {
            this.startKpiAnimation()
    }
    componentDidUpdate(prevProps, prevState) {
        //When the current prop 'fetch' is false and the old one (in state)
        //is true, it means that a filter was changed so the kpi must be entirely
        //deleted and re-created.
        if(!this.props.fetching && this.state.fetching){
            this.startKpiAnimation()
        }
    }

    render() {
        let width = this.props.width;
        let height = this.props.height;
        return (
                <div className="kpi" style={{width:width, height:height}} >
                    <i className={this.state.iconclass} 
                        style={{fontSize: 20 * width / 100, marginRight:'15%' }}>
                        {this.state.icon}
                    </i>
                    <div style={{marginTop:0, padding:0}}>
                        <span className="kpidata" style={{fontSize:25 * width /100}}>
                            {this.state.values.dec}
                        </span>
                        <span className="percent">%</span>
                    </div>
                    <div className="bottom">Last month: {this.state.values.nov}%</div>
                </div>
        );
    }

}

export default KPI
