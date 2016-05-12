import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
var numeral = require('numeral');
import $ from 'jquery';
class KPI extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {
            icon: 'trending_down', 
            iconclass: 'tdown material-icons',
            values: { nov:0, dec: 0}
        };
    }

    createKpi(){
        let kpi = this.props.kpi;
        let totals = (!this.props.totals) ? [] : this.props.totals
        var values = { nov: 0, dec: 0 }
        totals.map(function (item) {
            if(kpi.indexOf('JAZZ') > -1){
                values.nov =  item.current.metrics.calc_like_jazz_november.calc * 100;
                values.dec =  item.current.metrics.calc_likes_jazz_december.calc * 100;
            } 
            else if(kpi.indexOf('ROCK') > -1){
                values.nov =  item.current.metrics.calc_likes_rock_november.calc * 100;
                values.dec =  item.current.metrics.calc_likes_rock_sold_dicember.calc * 100;
            }
            else if(kpi.indexOf('SPORTS') > -1){
                values.nov =  item.current.metrics.calc_likes_sports_november.calc * 100;
                values.dec =  item.current.metrics.calc_likes_sports_december.calc * 100;
            }
        });
        values.nov = numeral(values.nov).format('0.00')
        return values;
    }

    componentWillMount() {
        let values = this.createKpi()
        let icon = (values.dec > values.nov) ? 'trending_up' : 'trending_down'
        let iconClass = (values.dec > values.nov) ? 'tup material-icons' : 'tdown material-icons'
        this.setState({
            icon: icon,
            iconclass: iconClass,
            values: values,
        })
    }

    componentDidMount() {
          let kpi = $(ReactDOM.findDOMNode(this)).find('h2');
          let value = this.state.values.dec
          let span = '<span class="percent">%</span>'
          $({counter: 0}).animate({counter: value}, {
              duration: 900,
              easing:'swing', // can be anything
              step: function() { // called on every step
                  kpi.html(numeral(this.counter).format('0.00')+span);
              }
          });
    }

    render() {
        return (
                <div className="kpi">
                    <i className={this.state.iconclass}>{this.state.icon}</i>
                    <h2 id={this.props.kpi}>{this.state.values.dec}<span className="percent">%</span></h2>
                    <div className="bottom">Last month: {this.state.values.nov}%</div>
                </div>
        );
    }

}
export default KPI
