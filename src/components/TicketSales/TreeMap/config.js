// modules/Trend.js
import React, { Component } from 'react';
import _ from 'lodash';
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
        //this.chart = echarts.init(domElement, theme);
        this.chart = this.props.echartobj.init(domElement, theme);
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
          let children = '';
          let count = 0
          _(params.data.children).forEach(function(child){
              if(count <= 6){
                  children += '<li>'+child.name+': '+numeral(child.value).format(fmtPattern)+'</li>'
              }
              count++;
          })
          children = (count > 6) ? children+'<li>...</li>' : children;
          let tooltip = '<div style="border-bottom: 1px solid #979797;padding:7px" align="center"> \
                  <b>'+params.name + '</b> \
                      <ul style="font-size:90%">'+children+'</ul>\
                  </div>'
                  + '<span style="font-weight:bold;font-size:90%">Price paid (sum): </span> ' 
                  + numeral(params.value).format(fmtPattern) + '<br/>';
          return tooltip
        }
      }
      var tooltipCountFormatter = genericTooltipFormatter(false);
      var tooltipMoneyFormatter = genericTooltipFormatter(true);

      var data = []
      _(items).forEach(function(item){
            let cityObj = _.find(data, function(o) { return o.name == item.group[0];});
            let value = item.current.metrics.pricepaid.sum
            if(cityObj === undefined){
                data.push({
                    name: item.group[0],
                    value: value,
                    children:[{name: item.group[1], value: value}]
                })
            }else{
                    let pos = cityObj.children.length;
                    _.set(cityObj, 'value.', cityObj.value + value);
                    _.set(cityObj,['children',pos,'name'], item.group[1])
                    _.set(cityObj,['children',pos,'value'], value)
                }
            })
        var option = {
            tz: 'EST',
            filters: [],
            player: null,
            tooltip : {
                trigger: 'item',
                formatter: tooltipMoneyFormatter 
            },
            series : [
                {
                    name:'Venue City',
                    type:'treemap',
                    size: ['95%', '89%'],
                    center: ['50%', '45%'],
                    itemStyle: {
                        normal: {
                            breadcrumb:{
                                    show: true,
                                    textStyle: { color:'#FFF' },
                            },
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
