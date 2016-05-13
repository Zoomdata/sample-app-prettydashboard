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
            updnumber: true
        };
    }

    createKpi(props){
        let kpi = this.props.kpi;
        let totals = (!props.totals) ? [] : props.totals
        let vals = { nov: 0, dec: 0 }
        totals.map(function (item) {
            if(kpi.indexOf('JAZZ') > -1){
                vals.nov =  item.current.metrics.calc_like_jazz_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_jazz_december.calc * 100;
            } 
            else if(kpi.indexOf('ROCK') > -1){
                vals.nov =  item.current.metrics.calc_likes_rock_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_rock_sold_dicember.calc * 100;
            }
            else if(kpi.indexOf('SPORTS') > -1){
                vals.nov =  item.current.metrics.calc_likes_sports_november.calc * 100;
                vals.dec =  item.current.metrics.calc_likes_sports_december.calc * 100;
            }
        });
        vals.nov = numeral(vals.nov).format('0.00')
        return vals;
    }

    prepareRender(props, upd){
        let values = this.createKpi(props)
        let icon = (values.dec > values.nov) ? 'trending_up' : 'trending_down'
        let iconClass = (values.dec > values.nov) ? 'tup material-icons' : 'tdown material-icons'
        if(values.dec != this.state.values.dec && values.nov != this.state.values.nov){
            this.setState({
                icon: icon,
                iconclass: iconClass,
                values: values,
                updnumber: upd,
            })
        }
        else{ this.setState({updnumber:false}) }
    }

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
        this.prepareRender(this.props, true);
    }
    componentWillMount() {
        this.prepareRender(this.props, false);
    }
    componentDidMount() {
        this.startKpiAnimation()
    }
    componentDidUpdate(prevProps, prevState) {
        this.startKpiAnimation()
    }

    render() {
        return (
                <div className="kpi">
                    <i className={this.state.iconclass}>{this.state.icon}</i>
                    <div style={{marginTop:0, padding:0}}>
                        <span className="kpidata">{this.state.values.dec}</span>
                        <span className="percent">%</span>
                    </div>
                    <div className="bottom">Last month: {this.state.values.nov}%</div>
                </div>
        );
    }

}

export default KPI
