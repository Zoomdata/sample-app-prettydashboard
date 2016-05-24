import React from 'react';
import ReactDOM from 'react-dom';
import {states}from './states';
import $ from 'jquery';
import './style.css';
import { setStateFilter, 
         setCityFilter,
         changeKpiFilter, 
         changeTrendFilter, 
         changeTreeMapFilter,
         changePivotFilter } from '../../redux/actions';

/*
 * Component that renders a select for the states and for the cities based
 * on the props from DashboardMenu
*/
class UserSelect extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {selectValue: ''};
    }

  showLoader(options, type){
      if(options.length == 1 && type == 'STATE'){
          return( <div className="preloader-wrapper smaller active">
                      <div className="spinner-layer spinner-grey">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                  </div>
                )
      }
  }
    handleChange(e){
        let value = e.target.value;
        if(this.props.type == 'STATE') {
            this.props.dispatch(setStateFilter(value))
            this.props.dispatch(setCityFilter(0))
        }else{
            this.props.dispatch(setCityFilter(value))
        }
        this.props.dispatch(changeKpiFilter());
        this.props.dispatch(changeTrendFilter());
        this.props.dispatch(changeTreeMapFilter());
        this.props.dispatch(changePivotFilter());
    }

    componentDidUpdate(){
        if(this.props.type == 'CITY' && this.props.city == 0 ){
            let elem = $(ReactDOM.findDOMNode(this)).find('.select');
            elem.val(0);
        }
    }

    render() {
        let disabled = true;
        if(this.props.options.length > 1){
            disabled = false;
        }
        return (
                <div className="select-filter">
                    {this.showLoader(this.props.options, this.props.type)}
                    <select className="select browser-default"
                             disabled={disabled}
                             defaultValue={0} 
                             onChange={this.handleChange.bind(this)} >
                            {this.props.options.map((o, i) => {
                                return( <option key={i} value={o.code}>{o.name}</option>)})}
                    </select>
                </div>
        );
    }

}
export default UserSelect
