import React from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import ReactDOM from 'react-dom';
class Widgets extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        var elem = ReactDOM.findDOMNode(this);
        var data = { id:this.props.id,
                 width: elem.clientWidth,
                 height: elem.clientHeight,
        }
        //this.props.dispatch(resizeWidget(data));
    }

    render(){
        return (
                  <li id={this.props.id}
                      key={this.props.id}
                      data-row={this.props.drow}
                      data-col={this.props.dcol}
                      data-sizex={this.props.dsizex}
                      data-sizey={this.props.dsizey}>
                      <div className="card card-panel dark-grey">
                          <WidgetHeader id={this.props.id}
                                        dispatch={this.props.dispatch}
                                        name = {this.props.name}/>
                          <WidgetBody height={400} 
                                      width={400} 
                                      type={this.props.type}
                                      id={this.props.id}/>
                      </div>
                </li>
               );
    }
}

export default Widgets
