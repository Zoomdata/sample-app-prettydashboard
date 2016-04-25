import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var moment = require('moment');
var numeral = require('numeral');
var ReactHighcharts = require('react-highcharts');
import echarts from 'echarts';
import { FilterStatuses } from '../redux/actions'
import { dark } from '../utils/dark-theme';
import { light } from '../utils/light-theme';

export default class KPIs extends Component {

    getData(){
        var kpi = this.props.type;
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

        console.log(items);

        var totals;
        if (!this.props.totals) {
            totals = [];
        } else {
            totals = this.props.totals;
        }

        var itemGroup, portfolioPercent = 0, osPercent = 0, 
            defaultPropense = 0, delinqRecency = 0, totalLoans = 0;

        if (!this.props.filters.loanGrade) {
            itemGroup = 'All';
        } else {
            itemGroup = this.props.filters.loanGrade;
        }

        if (itemGroup === 'All') {
            for (let total of totals) {
                totalLoans = total.current.count;
                if(kpi.indexOf('PORT') > -1) return total.current.metrics.calc_portfolio.calc;
                if(kpi.indexOf('OS') > -1) return total.current.metrics.calc_o_s.calc;
                if(kpi.indexOf('DELINQUENCY') > -1) return total.current.metrics.calc_default_propensity.calc;
                if(kpi.indexOf('PROPENSITY') > -1) return total.current.metrics.calc_delinquency_recency.calc;
            }
        } else {
            for (let item of items) {
                if (item.group[0] == itemGroup) {
                   totalLoans = item.current.count;
                    if(kpi.indexOf('PORT') > -1) return item.current.metrics.calc_portfolio.calc;
                    if(kpi.indexOf('OS') > -1) return item.current.metrics.calc_o_s.calc;
                    if(kpi.indexOf('DP') > -1) return item.current.metrics.calc_default_propensity.calc;
                    if(kpi.indexOf('DR') > -1) return item.current.metrics.calc_delinquency_recency.calc;
                }
            };
        }
    }

    createChart() {
	    var domElement = ReactDOM.findDOMNode(this);
        //let theme = (this.props.type.indexOf('KPI') > -1) ? light() : dark();
        let theme = dark();
        this.chart = echarts.init(domElement,theme);
        this.updateChart(this.props);
    }

    updateChart(nextProps) {
        // give up quickly if props are empty.
        if (!nextProps) {
            return null;
        }
        var newChartOptions = this.makeChartOptions(nextProps);
        this.chart.setOption(newChartOptions);
        this.chart.on('CLICK', nextProps.onClick);
    }


    makeChartOptions(nextProps) {
        var colors = {
            'KPIPORTFOLIO': '#7E7EFD', //blue
            'KPIOS': '#80D280', //green
            'KPIDEFAULTPROPENSITY': '#FFFF7D', //yellow
            'KPIDELINQUENCYRECENCY': '#FF6C5E', //red
        }
        let smaller = this.props.width <= this.props.height ? this.props.width : this.props.height;
        let inner = smaller / 4
        let outter = (inner * 32) / 100 + inner
        //Proportion will be 76%
        //let outter = (this.props.height * 32) / 100
        //let inner = (outter * 76 ) / 100
        var radius = ['50%', '65%'];
        var center = ['50%', '50%'];
        var color = '#656565'
        var fsize = 20;
        var textColor = '#FFF'
        var name = ' '
        if(this.props.zoom.indexOf('KPI') > -1){
            radius = [95, 165];
            fsize = 30;
            color = '#777';
            color = '#656565'
            textColor = '#FFF';
            name = this.props.name;
        }

    
        //console.log(this.props.type+' '+this.getData());
        var val = parseFloat(Math.round(this.getData() * 100) / 100).toFixed(2);

        //TODO: These values must be moved from here to somewhere else any moment


        var labelTop = {
            normal : {
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                    }
                },
                labelLine : {
                    show : false
                }
            }
        };
        var labelFromatter = {
            normal : {
                color: colors[this.props.type],
                label : {
                    formatter : function (params){
                        return parseFloat(Math.round((100 - params.value) * 100) / 100).toFixed(2) + '%';
                    },
                    textStyle: {
                        baseline : 'middle',
                        fontSize: fsize,
                        fontWeight: 'bold',
                        color: textColor,
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: color,
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            },
            emphasis: {
                color: '#DDD'
            }
        };
        var option = {
            series : [
                {
                    type : 'pie',
                    center : center,
                    radius : radius,
                    x: '10%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value: 100 - val, itemStyle : labelBottom},
                        {name: name, value: val ,itemStyle : labelTop}
                    ]
                }
            ]
           };
        return option;
    }

    componentDidMount() {
        this.createChart();
    }

    componentWillUnmount() {
        this.chart.dispose();
    }

    componentDidUpdate() {
        this.chart.resize()
        this.updateChart(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    render() {
        return(<div id={this.props.type} style={{height: this.props.height, width: this.props.width}} />)
	}
}
