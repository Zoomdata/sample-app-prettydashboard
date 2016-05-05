// modules/Trend.js
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var echarts = require('echarts');
var moment = require('moment');
var numeral = require('numeral');
import { dark } from '../../../utils/dark-theme';

export default class Tree extends Component {

	createChart() {
	    // Initialize after dom ready
        var domElement = ReactDOM.findDOMNode(this);
        let theme = dark();
        this.chart = echarts.init(domElement, theme);
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
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }

      var genericTooltipFormatter = function(isMoney) {
        return function(params) {
          var fmtPattern = isMoney ? '$0,000.' : '0,000.';
          return '<div style="border-bottom: 1px solid #979797;padding:7px" align="center"> \
                      <b>'+params.name + '</b> \
                  </div>'
                  + '<span style="font-weight:bold;font-size:90%">Price paid (sum): </span> ' 
                  + numeral(params.value).format(fmtPattern) + '<br/>';
        }
      }
      var tooltipCountFormatter = genericTooltipFormatter(false);
      var tooltipMoneyFormatter = genericTooltipFormatter(true);

        var data = items.map(function(item) {
          return {value: +item.current.metrics.pricepaid.sum.toFixed(2), 
                  name: item.group[0]};
        });

        var option = {
            tz: 'EST',
            filters: [],
            player: null,
            tooltip : {
                trigger: 'item',
                formatter: tooltipMoneyFormatter 
            },
            groups: [{
                name: 'eventname',
                limit: 100,
                sort: {
                    dir: 'desc',
                    name: 'eventname'
                  }
              }
            ],
            series : [
                {
                    name:'Event',
                    type:'treemap',
                    size: ['200%', '200%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}",
                                textStyle:{
                                        color:'#201F21',
                                }
                            },
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: data,
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
