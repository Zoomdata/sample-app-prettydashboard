import React from 'react';
import './style.css';
let viewType = ['Choose View', 'Transactions', 'Ticket sold(qty)', 'Sales', 'Commission', 'Avg Sales Price', 'Av Commission' ]
class ViewSelect extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {selectValue: 'Choose View'};
    }

    handleChange(e){
            this.setState({selectValue:e.target.value});
            console.log(e.target.value);
        }

    render() {
        return (
                <div className="options">
                    <select className="select browser-default"
                             defaultValue={this.state.selectValue} 
                             onChange={this.handleChange.bind(this)} >
                    {viewType.map((v, i) => {
                        return( <option key={i} value={v}>{v}</option>)})}
                    </select>
                </div>
        );
    }

}
export default ViewSelect
