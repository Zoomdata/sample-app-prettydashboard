import React from 'react';
import './style.css';

let months = [
    {val: 0, label: 'Choose Month'},
    {val: 1, label: 'January 2008'},
    {val: 2, label: 'February 2008'},
    {val: 3, label: 'March 2008'},
    {val: 4, label: 'April 2008'},
    {val: 5, label: 'May 2008'},
    {val: 6, label: 'June 2008'},
    {val: 7, label: 'July 2008'},
    {val: 8, label: 'August 2008'},
    {val: 9, label: 'September 2008'},
    {val: 10, label: 'October 2008'},
    {val: 11, label: 'November 2008'},
    {val: 12, label: 'December 2008'},
]

class MonthSelect extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {selectValue: 0};
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
                            {months.map((m, i) => {
                                return( <option key={i} value={m.val}>{m.label}</option>)})}
                    </select>
                </div>
        );
    }

}
export default MonthSelect
