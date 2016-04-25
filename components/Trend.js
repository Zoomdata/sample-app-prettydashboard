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


    makeChartOptions(nextProps) {
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

        var xAxis = items.map(function(item) {
            var m = moment(item.group[0],'YYYY-MM-DD HH:mm:ss');
            var str = m.format('MM/DD/YYYY');
            return str;
        });
        var yAxis1 = items.map(function(item) {
            return item.current.metrics.loan_amnt.sum.toFixed(0);
        });
        var yAxis2 = items.map(function(item) {
            return item.current.metrics.total_pymnt.sum.toFixed(0);
        });

        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                show: true,
                data: ['Loan Amount','Total Payment']
            },
            toolbox: {
                show : false
            },
            calculable : true,
            dataZoom : {
                show : true,
                realtime : false,
                start : 0,
                end : 100,
                textColor: '#FFF'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        formatter: function (v) {
                            var result;
                            if (v > 99999) {
                                result = '$' + numeral(v/1000).format('0,0') + ' k';
                            } else {
                                result = '$' + numeral(v).format('0,0');
                            }
                            return result;
                        }
                    }

                }
            ],
            series : [
                {
                    name:'Loan Amount',
                    type:'line',
                    data: yAxis1
                },
                {
                    name:'Total Payment',
                    type:'bar',
                    data: yAxis2
                }
            ]
        };
        
        return option;
    }

	componentDidMount() {
    	this.createChart();
        var elem = ReactDOM.findDOMNode(this);
        let h = elem.offsetHeight;
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
