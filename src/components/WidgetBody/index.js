import React from 'react';
import ReactDOM from 'react-dom';
import Dimensions from 'react-dimensions'
import { resizeWidget } from '../../redux/actions'
import { dark } from '../../utils/dark-theme';
import VisibleDonut  from '../LendClub/VisibleDonut';
import VisibleTrend  from '../LendClub/VisibleTrend';
import VisibleTable  from '../LendClub/VisibleTable';
import VisibleKPIs   from '../LendClub/VisibleKPIs';
import EmptyWidget   from '../EmptyWidget';
var echarts = require('echarts');

class WidgetBody extends React.Component{

    constructor(state, context){
        super(state, context);
    }

    getChart(type, id) {
        if(type.indexOf('KPI') > -1)
            { return (
                    <div>
                        <VisibleKPIs key={id} 
                            type={type} 
                            height={this.props.height} 
                            width={this.props.width}/>
                    </div>
                )
            }
        else if(type === 'DONUT')
            { return (
                    <div>
                        <VisibleDonut key={id} 
                            type={type} 
                            height={this.props.height} 
                            width={this.props.width}/>
                    </div>
                )
            }
         else if(type === 'TREND') //Trend
            { return ( 
                <div>
                    <VisibleTrend key={id} 
                        type={type} 
                        height={this.props.height} 
                        width={this.props.width}/>
                </div>
              )
            }
         else if(type === 'TABLE') //Trend
            { return ( 
                <div>
                    <VisibleTable key={id} 
                        type={type} 
                        height={this.props.height} 
                        width={this.props.width}/>
                </div>
              )
            }
            else{
                return(
                    <div>
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
