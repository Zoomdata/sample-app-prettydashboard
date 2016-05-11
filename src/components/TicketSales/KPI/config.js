import React from 'react';
import './style.css';
var numeral = require('numeral');
class KPI extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {icon: 'trending_down', 
            classes: 'tdown material-icons',
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

        values.dec = numeral(values.dec).format('0.00');
        values.nov = numeral(values.nov).format('0.00');
        return values;
    }

    render() {
        let values = this.createKpi()
        let icon = (values.dec > values.nov) ? 'trending_up' : 'trending_down'
        let iconClass = (values.dec > values.nov) ? 'tup material-icons' : 'tdown material-icons'
        return (
                <div className="kpi">
                    <i className={iconClass}>{icon}</i>
                    <h2>{values.dec}<span className="percent">%</span></h2>
                    <div className="bottom">Last month:{values.nov}%</div>
                </div>
        );
    }

}
export default KPI
