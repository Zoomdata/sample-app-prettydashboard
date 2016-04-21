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

    getChart(type, id) {
        if(type.indexOf('KPI') > -1)
            { return (
                    <div>
                        <VisibleKPIs key={id} type={type}/>
                    </div>
                )
            }
        else if(type === 'DONUT')
            { return (
                    <div>
                        <VisibleDonut key={id} type={type}/>
                    </div>
                )
            }
            else //Trend
            { return ( 
                <div>
                    <VisibleTrend key={id} type={type}/>
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
