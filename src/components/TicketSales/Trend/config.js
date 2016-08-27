// modules/Trend.js
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var echarts = require('echarts');
var ecConfig=require('echarts');
var moment = require('moment');
var numeral = require('numeral');
import { dark } from '../../../utils/dark-theme';

/**
 * Trend is a react component that renders a trend visualization by integrating
 * ECharts. 
 */
export default class Trend extends Component {

	createChart() {
	    // Initialize after dom ready
        var domElement = ReactDOM.findDOMNode(this);
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

    //itemGroup = this.props.filters.loanGrade;

    makeChartOptions(nextProps) {
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

        var labels = items.map(function(item, index) {
            return moment(item.group[0]).utcOffset(0).format('MM/DD/YYYY');
        }); 

        var qtySold = items.map(function(item) { //Loan amount
            return item.current.metrics.qtysold.sum.toFixed(0);
        });
        var count = items.map(function(item) { //Total Payment
            return item.current.count;
        });

         var numberFormatter = function(isMoney) {
           return function (v) {
             var fmtPattern = isMoney ? '$0,0' : '0,0';
             let result = numeral(v).format(fmtPattern);
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

        let zoomposition = this.props.height - 10
        var option1 = {
            color: ['#fdc086','#386cb0'], 
            tooltip: {
                trigger: 'axis',
                formatter: multiSeriesTooltipQtyFormatter
            },
            legend: {
              data: ['Ticket Solds', 'Transactions'],
            },
                dataZoom : {
                    show : true,
                    realtime : false,
                    start : 0,
                    end : 100,
                },
            calculable : true,
            grid: {
                x: 50,
                y: 25,
                x2: 28,
                y2: 63
            },
            xAxis : [
                {
                    type: 'category',
                    boundaryGap : false,
                    data: labels
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    splitArea: {show: true},
                    axisLabel: {
                        formatter: qtyFormatter,
                    }
                }
            ],
            series : [
                  {
                    name: 'Ticket Solds',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: qtySold,
                  },
                  {
                    name: 'Transactions',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: count,
                  }
            ]
        };

	    var option = {
                color: ['#fdc086','#386cb0'], 
                tooltip: {
                    trigger: 'axis',
                    formatter: multiSeriesTooltipQtyFormatter
                },
                legend: {
                  data: ['Ticket Solds', 'Transactions'],
                  y: 'bottom'
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
                    data: labels
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
                    data: qtySold,
                  },
                  {
                    name: 'Transactions',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: count,
                  }
                ]
	};
        
        return option1;
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
        let styles={
            height: this.props.height,
            width: this.props.width,
        }
	  	return (
            <div id={this.props.type} 
                style={styles} />
    	)
	}

}
