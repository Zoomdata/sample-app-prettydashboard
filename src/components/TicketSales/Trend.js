// modules/Trend.js
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var echarts = require('echarts');
var ecConfig=require('echarts');
var moment = require('moment');
var numeral = require('numeral');
import { dark } from '../utils/dark-theme';
import { light } from '../utils/light-theme';

export default class Trend extends Component {

	createChart() {
	    // Initialize after dom ready
        var domElement = ReactDOM.findDOMNode(this);
        //let theme = (this.props.zoom == 'TREND') ? light() : dark();
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
        this.props.charopts[this.props.type] = this.chart;
        this.props.charopts['theme'] = this.props.theme;
        this.chart.on('CLICK', nextProps.onClick);
    }

    //itemGroup = this.props.filters.loanGrade;

    makeChartOptions(nextProps) {
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

        var xAxis = items.map(function(item) { //Category
            var m = moment(item.group[0],'YYYY-MM-DD HH:mm:ss');
            var str = m.format('MM/DD/YYYY');
            return str;
        });
        var yAxis1 = items.map(function(item) { //Loan amount
            return item.current.metrics.loan_amnt.sum.toFixed(0);
        });
        var yAxis2 = items.map(function(item) { //Total Payment
            return item.current.metrics.total_pymnt.sum.toFixed(0);
        });

         var numberFormatter = function(isMoney) {
           return function (v) {
             var fmtPattern = isMoney ? '$0,0' : '0,0';
             result = numeral(v).format(fmtPattern);
             return result;
           }   
         }
         var qtyFormatter = numberFormatter(false);
         var moneyFormatter = numberFormatter(true);

         var genericMultiSeriesTooltipFormatter = function(isMoney) {
           return function(params) {
             var fmtPattern = isMoney ? '$0,000.' : '0,000.';
             return params[0].name + '<br/>'
                  + params[0].seriesName + ' : ' + numeral(params[0].value).format(fmtPattern) + '<br/>'
                  + params[1].seriesName + ' : ' + numeral(params[1].value).format(fmtPattern) + '<br/>';       
           }
         }
        var multiSeriesTooltipMoneyFormatter = genericMultiSeriesTooltipFormatter(true);
        var multiSeriesTooltipQtyFormatter = genericMultiSeriesTooltipFormatter(false);

	    var option = {
                zd_data_status: 'not_ready',
                zd_height: null,
                zd_width: null,
                version: 1,
                color: ['#fdc086','#386cb0'], 
                tooltip: {
                    trigger: 'axis',
                    formatter: multiSeriesTooltipQtyFormatter
                },
                legend: {
                  data: ['Ticket Solds', 'Transactions'],
                  y: 'top'
                },
                toolbox: {
                  show: false
                },
                grid: {
                    x: 50,
                    y: 30,
                    x2: 28,
                    y2: 23
                },
                padding: 0,
                calculable: false,
                xAxis: [
                  {
                    type: 'category',
                    data: []
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    splitArea: {show: true},
                    axisLabel: {
                        formatter: qtyFormatter,
                    }
                  }
                ],
                series: [
                  {
                    name: 'Ticket Solds',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: []
                  },
                  {
                    name: 'Transactions',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: []
                  }
                ]
	};
        
        return option;
    }

	componentDidMount() {
    	this.createChart();
        this.chart.resize();
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

    

	render(){
	  	return (
            <div id={this.props.type} 
                style={{height: this.props.height, width: this.props.width}} />
    	)
	}

}
