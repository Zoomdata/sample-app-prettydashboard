// modules/Trend.js
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import _ from 'lodash';
var echarts = require('echarts');
var moment = require('moment');
var numeral = require('numeral');
import { dark } from '../../../utils/dark-theme';

export default class Tree extends Component {

    constructor(state,context){
        super(state,context);
        this.state = {fetching:false};
    }

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
    }

    makeChartOptions(nextProps) {
        var items;
        if (!this.props.items) {
            items = [];
        } else {
            items = this.props.items;
        }


      var genericTooltipFormatter = function(metric) {
        return function(params) {
          //let value = (metric == 'count') ? item.current.count : item.current.metrics[metric][func]
          let fmtPattern = (metric.value == 'count' || metric.value == 'qtysold') ? '0,000.' : '$0,000.'
          let children = '';
          let count = 0
          _(params.data.children).forEach(function(child){
              if(count <= 6){
                  let name = (child.name.length > 25 ) ? child.name.slice(0,24)+'...' : child.name;
                  console.log(name);
                  children += '<li>'+name+': '+numeral(child.value).format(fmtPattern)+'</li>'
              }
              count++;
          })
          children = (count > 6) ? children+'<li>...</li>' : children;
          let tooltip = '<div style="border-bottom: 1px solid #979797;padding:7px" align="center"> \
                  <b>'+params.name + '</b> \
                      <ul style="font-size:90%">'+children+'</ul>\
                  </div>'
                  + '<span style="font-weight:bold;font-size:90%">'+metric.name+': </span> ' 
                  + numeral(params.value).format(fmtPattern) + '<br/>';
          return tooltip
        }
      }
      var tooltipFormatter = genericTooltipFormatter(this.props.metric);
      let metric = this.props.metric.value;
      let func = this.props.metric.type;
      let data = [];
      _(items).forEach(function(item){
          if(item.group[0] != null || item.group[0] != undefined){
            let venueObj = _.find(data, function(o) { return o.name == item.group[0];});
            let value = (metric == 'count') ? item.current.count : item.current.metrics[metric][func]
            if(venueObj === undefined){
                data.push({
                    name: item.group[0],
                    value: value,
                    children:[{name: item.group[1], value: value}]
                })
            }else{
                    let pos = venueObj.children.length;
                    _.set(venueObj, 'value.', venueObj.value + value);
                    _.set(venueObj,['children',pos,'name'], item.group[1])
                    _.set(venueObj,['children',pos,'value'], value)
                }
          }})
        //Sort alphabetically by name
        data = _.sortBy(data, function(o) { return o.name; });
        for (let i = 0, len = data.length; i < len; i++) {
            //Sort children alphabetically by name too
            data[i].children = _.sortBy(data[i].children, function(o) { return o.name; });
        }

        
        var width = this.props.width
        var height = this.props.height
        return {
            tz: 'EST',
            filters: [],
            player: null,
            tooltip : {
                trigger: 'item',
                formatter: tooltipFormatter,
                hideDelay: 50,
                //position: function([x, y]) {return [newX,newY]}
                position: function([x,y]){ 
                    let wmiddle = width / 2;
                    if(x > wmiddle) {x = (x - wmiddle)}
                    return [x,y]
                }
            },
            series : [
                {
                    name:'Venue',
                    type:'treemap',
                    size: ['98%', '90%'], //[width, height]
                    center: ['50%', '47%'],//[x,y] 
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
        }
    }

	componentDidMount() {
        this.createChart();
        this.chart.resize();
  	}

	componentWillUnmount() {
		this.chart.dispose();
	}

	componentDidUpdate() {
        //When the current prop 'fetch' is false and the old one (in state)
        //is true, it means that a filter was changed so the chart must be entirely
        //deleted and re-created.
            if(!this.props.fetching && this.state.fetching){
                this.chart.dispose();
                this.createChart();
            }
            this.chart.resize()
            //this.updateChart(this.props);
	}

	componentWillReceiveProps(nextProps) {
        this.setState({fetching: this.props.fetching})
		//this.updateChart(nextProps);
	}

	render(){
        let styles={
            height: this.props.height,
            width: this.props.width,
        }
	  	return (
            <div id={this.props.type} style={styles} />
    	)
	}

}
