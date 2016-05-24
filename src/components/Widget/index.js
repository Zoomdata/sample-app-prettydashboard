import React from 'react';
import WidgetHeader from '../WidgetHeader';
import WidgetBody from '../WidgetBody';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import echarts from 'echarts';
import { resizeWidget } from '../../redux/actions';
/*
 * Widget renders each widget based on the specs (props) 
 * declared on redux/reducers/dashboard.js. Also renders for each widget:
 * WidgetHeader
 * WidgetBody
 */
class Widget extends React.Component{

    handleDrag(elem){
         let grid = $('#gridcontainer')
         let nw = $(elem).width();
         let offs = $(elem).offset().left;
         var gwidth = grid.width();
         let totalWidth = (nw + offs)
         if (totalWidth > gwidth){
             let scroll = totalWidth - gwidth
             grid.scrollLeft(scroll+10);
         }
    }

    /*
        Waits for the onclick event on the widget( fired on the resize handler 
        in dist/js/gridster-app.js ) to calculate current size of the widget
        and update it on the store.
     */
     resizeWidget(elem, dispatch){
         let grid = $('#gridcontainer')
         let nw = $(elem).width();
         let offs = $(elem).offset().left;
         var gwidth = grid.width();
         let totalWidth = (nw + offs)
         if (totalWidth > gwidth){
             let scroll = totalWidth - gwidth
             grid.scrollLeft(scroll+10);
         }
         return dispatch(resizeWidget({
                id: $(elem).attr('id'),
                width: $(elem).width(),
                height: $(elem).height()
             }))
     }


      componentDidMount() {
        let elem = document.getElementById(this.props.type);
        $(elem).on('click', function(){
            this.resizeWidget(elem, this.props.dispatch) 
        }.bind(this));
        $(elem).on('mousedown', function(){
            this.handleDrag(elem)
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
                                        data={this.props.data}
                                        name = {this.props.name}/>
                          <WidgetBody height={this.props.height} 
                                      width={this.props.width} 
                                      data={this.props.data}
                                      type={this.props.type}
                                      id={this.props.id}/>
                      </div>
                </li>
               );
    }
}

export default Widget
