import React from 'react';
import './style.css';
import _ from 'lodash';
import { changeTreeMapFilter, setTreeMapFilter } from '../../../redux/actions';
let metrics = [
    { type:'sum', value:'none',name:'Choose View'}, 
    { type:'sum', value:'count',name:'Transactions'}, 
    { type:'sum', value:'pricepaid',name:'Sales'}, 
    { type:'sum', value:'qtysold',name:'Tickets sold qty'}, 
    { type:'sum', value:'commission',name:'Commission'}, 
    { type:'calc', value:'calc_avg_sales_price',name:'Avg Sales Price'}, 
    { type:'calc', value:'calc_avg_commission',name:'Avg Commission'} ]
class MetricSelect extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {selectValue: 'Choose View'};
    }

    handleChange(e){
            this.setState({selectValue:e.target.value});
            if(e.target.value != 'none'){
                let metric = _.find(metrics, function(o) { return o.value == e.target.value;});
                this.props.dispatch(setTreeMapFilter(metric));
                //this.props.dispatch(changeTreeMapFilter());
            }
        }

    render() {
        return (
                <div className="options">
                    <select className="select browser-default"
                            style={{display:'inline'}}
                             defaultValue={this.state.selectValue} 
                             onChange={this.handleChange.bind(this)} >
                    {metrics.map((v, i) => {
                        return( <option key={i} value={v.value}>{v.name}</option>)})}
                    </select>
                </div>
        );
    }
}
export default MetricSelect
