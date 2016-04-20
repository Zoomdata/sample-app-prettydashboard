import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var moment = require('moment');
var numeral = require('numeral');
var ReactHighcharts = require('react-highcharts');
import echarts from 'echarts';
import { FilterStatuses } from '../redux/actions'

export default class KPIs extends Component {

    getData(){
        var kpi = this.props.kpi;
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

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
        // Initialize after dom ready
        //var domElement = ReactDOM.findDOMNode(this);
        //if(this.props.skin === 'dark')
            //this.chart = echarts.init(domElement,dark());
        //else{ this.chart = echarts.init(domElement) }
        this.updateChart(this.props);
    }

    updateChart(nextProps) {
        // give up quickly if props are empty.
        if (!nextProps) {
            return null;
        }
        var domElement = ReactDOM.findDOMNode(this);
        //Delete the previous chart
        if(this.chart !== undefined)
            this.chart.dispose();
        if(this.props.skin === 'dark')
            this.chart = echarts.init(domElement,dark());
        else{ this.chart = echarts.init(domElement) }
        var newChartOptions = this.makeChartOptions(nextProps);
        this.chart.setOption(newChartOptions);
        this.chart.on('CLICK', nextProps.onClick);
    }

    makeChartOptions(nextProps) {
        var colors = {
            'KPI-PORTFOLIO': '#7E7EFD', //blue
            'KPI-OS': '#80D280', //green
            'KPI-DEFAULT-PROPENSITY': '#FFFF7D', //yellow
            'KPI-DELINQUENCY-RECENCY': '#FF6C5E', //red
        }
        var value = parseFloat(Math.round(this.getData() * 100) / 100).toFixed(2);
        var labelTop = {
            normal : {
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        baseline : 'bottom'
                    }
                },
                labelLine : {
                    show : false
                }
            }
        };
        var labelFromatter = {
            normal : {
                color: colors[this.props.kpi],
                label : {
                    formatter : function (params){
                        return parseFloat(Math.round((100 - params.value) * 100) / 100).toFixed(2) + '%';
                    },
                    textStyle: {
                        baseline : 'middle',
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#FFF',
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: '#ccc',
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        var radius = [50, 65];
        var option = {
            series : [
                {
                    type : 'pie',
                    center : ['50%', '51%'],
                    radius : radius,
                    x: '0%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value: 100 - value, itemStyle : labelBottom},
                        {name: '', value: value ,itemStyle : labelTop}
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
        this.updateChart(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }


    render() {
        return(<div style={{height: 200, width: 200}} />)
	}
}
