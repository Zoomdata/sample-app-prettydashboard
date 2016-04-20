import React from 'react';
import Donut  from './Donut';
import { dark } from '../utils/dark-theme';
import ReactDOM from 'react-dom';
import Dimensions from 'react-dimensions'
import { resizeWidget } from '../redux/actions'
import VisibleDonut  from './VisibleDonut';
import VisibleTrend  from './VisibleTrend';
import VisibleKPIs  from './VisibleKPIs';
import Trend  from './Trend';
var echarts = require('echarts');

class WidgetBody extends React.Component{

    constructor(state, context){
        super(state, context);
    }

	createChart() {
	    // Initialize after dom ready
	    var domElement = ReactDOM.findDOMNode(this);
        var card = domElement.parentNode;
        var li = card.parentNode;
        var w = li.offsetWidth;
        var h = li.offsetHeigth;
        console.log(h+' '+w);
        var canvas = this.refs.canvas;
        //canvas.setAttribute("style", "height:"+h+"px;width:"+w+"px");
        //this.chart = echarts.init(this.refs.canvas, dark());
  	}

	componentDidMount() {
	    var elem = ReactDOM.findDOMNode(this);
        var data = { id:this.props.id,
                     width: elem.clientWidth,
                     height: elem.clientHeight,
        }
        //this.props.dispatch(resizeWidget(data));
        //this.createChart();
        //
        //setTimeout(function(){ 
            ////console.log('Mounting wbody after timeout');
            ////this.createChart();
        //}, 3000);
  	}

    getChart(type, id) {
        if(type.indexOf('KPI') > -1)
            { return (
                    <div>
                        <VisibleKPIs key={id} kpi={type}/>
                    </div>
                )
            }
        else if(type === 'DONUT')
            { return (
                    <div>
                        <VisibleDonut key={id}/>
                    </div>
                )
            }
            else //Trend
            { return ( 
                <div>
                    <VisibleTrend key={id}/>
                </div>
              )
            }
    }

    render(){
        return ( 
                <div className="card-body">
                    {this.getChart(this.props.type, this.props.id)}
                </div>
           );
    }
}

export default WidgetBody;
