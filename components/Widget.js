import React from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import echarts from 'echarts';
class Widgets extends React.Component{

    constructor(state, context){
        super(state, context)
        this.state = {
            width:400,
            height:400
        }
    }

      componentDidMount() {
        var elem = ReactDOM.findDOMNode(this);
        echartObj = echarts; 
      }

    componentDidUpdate(){
        var elem = ReactDOM.findDOMNode(this);
        var data = { id:this.props.id,
                 width: elem.clientWidth,
                 height: elem.clientHeight,
        }
        //this.props.dispatch(resizeWidget(data));
    }

    render(){
        return (
                  <li id={this.props.type}
                      key={this.props.id}
                      data-row={this.props.drow}
                      data-col={this.props.dcol}
                      data-sizex={this.props.dsizex}
                      data-sizey={this.props.dsizey}>
                      <div className="card card-panel dark-grey">
                          <WidgetHeader id={this.props.id}
                                        dispatch={this.props.dispatch}
                                        name = {this.props.name}/>
                          <WidgetBody height={this.state.height} 
                                      width={this.state.width} 
                                      type={this.props.type}
                                      id={this.props.id}/>
                      </div>
                </li>
               );
    }
}

export default Widgets
