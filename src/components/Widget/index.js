import React from 'react';
import WidgetHeader from '../WidgetHeader';
import WidgetBody from '../WidgetBody';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import echarts from 'echarts';
import { resizeWidget } from '../../redux/actions';
class Widgets extends React.Component{

      componentDidMount() {
        let elem = document.getElementById(this.props.type);
        let id = $(elem).attr('id')
        $(elem).on('click', function(){
            this.props.dispatch(resizeWidget({
                id: id,
                width: $(elem).width(),
                height: $(elem).height()
            }))
        }.bind(this));
      }

    componentDidUpdate(){
        var elem = ReactDOM.findDOMNode(this);
        var data = { id:this.props.id,
                 width: elem.clientWidth,
                 height: elem.clientHeight,
        }
    }

    render(){
        return (
                  <li id={this.props.type}
                      className="grid-li"
                      key={this.props.id}
                      data-row={this.props.drow}
                      data-col={this.props.dcol}
                      data-sizex={this.props.dsizex}
                      data-sizey={this.props.dsizey}>
                      <div className="card card-panel dark-grey">
                          <WidgetHeader id={this.props.id}
                                        dispatch={this.props.dispatch}
                                        name = {this.props.name}/>
                          <WidgetBody height={this.props.height} 
                                      width={this.props.width} 
                                      type={this.props.type}
                                      id={this.props.id}/>
                      </div>
                </li>
               );
    }
}

export default Widgets
