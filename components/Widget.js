import React from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { resizeWidget } from '../redux/actions';
class Widget extends React.Component{

    render(){
        return ( 
                  <div id={this.props.id} className="card card-panel dark-grey">
                      <WidgetHeader id={this.props.id}
                                    dispatch={this.props.dispatch}
                                    name = {this.props.name}/>
                     <WidgetBody height={this.props.height} 
                                      width={this.props.width} 
                                      type={this.props.type}
                                      id={this.props.id}/>
                  </div>
               );
    }
}

export default Widget
