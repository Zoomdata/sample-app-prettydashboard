import React from 'react';
import Donut  from './Donut';
import { dark } from '../utils/dark-theme';
import ReactDOM from 'react-dom';
import Dimensions from 'react-dimensions'
import { resizeWidget } from '../redux/actions'
import VisibleDonut  from './VisibleDonut';
import VisibleTrend  from './VisibleTrend';
import VisibleKPIs  from './VisibleKPIs';
import EmptyWidget from './EmptyWidget';
import Trend  from './Trend';
var echarts = require('echarts');

class WidgetBody extends React.Component{

    constructor(state, context){
        super(state, context);
    }

    getChart(type, id) {
        if(type.indexOf('KPI') > -1)
            { return (
                    <div className="wdg-wrapper">
                        <VisibleKPIs key={id} 
                            type={type} 
                            height={this.props.height} 
                            width={this.props.width}/>
                    </div>
                )
            }
        else if(type === 'DONUT')
            { return (
                    <div className="wdg-wrapper">
                        <VisibleDonut key={id} 
                            type={type} 
                            height={this.props.height} 
                            width={this.props.width}/>
                    </div>
                )
            }
         else if(type === 'TREND') //Trend
            { return ( 
                <div className="wdg-wrapper">
                    <VisibleTrend key={id} 
                        type={type} 
                        height={this.props.height} 
                        width={this.props.width}/>
                </div>
              )
            }
            else{
                return(
                   <div className="wdg-wrapper">
                        <EmptyWidget key={id} 
                            type={type} 
                            height={this.props.height} 
                            width={this.props.width}/>
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
