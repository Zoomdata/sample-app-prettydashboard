import React from 'react';
import { addWidget } from '../redux/actions'
import { connect } from 'react-redux';
import $ from 'jquery';

class AddWidgetButton extends React.Component{
    constructor(state,context){
        super(state,context);
        this.state = {};
    }

    addEmptyWidget(){
        //code
        
    }

  handleEmptyWidgetClick(){
      //code
        var widgetVals = {
            id: 1,
            name: 'WIDGET NAME',
            type:'EMPTY',
            drow: 3,
            dcol: 1,
            dsizex: 3,
            dsizey: 2,
      };
      //this.props.dispatch(addWidget(widgetVals));
      jwidget(widgetVals); //TODO:Change this
  }

    render(){
        return( 
                <div className="fixed-action-btn" style={{bottom:'45px', right:'24px'}}>
                    <a className="btn-floating btn-large blue tooltipped" data-position="left" data-delay="50" data-tooltip="Add new chart">
                      <i className="large material-icons">add</i>
                    </a>
                    <ul>
                        <li><a className="btn-floating blue tooltipped" 
                                data-position="left" 
                                data-delay="50" 
                                onClick = {this.handleEmptyWidgetClick.bind(this)}
                                id="new" 
                                data-tooltip="Empty widget">
                                <i className="material-icons">crop_square</i></a></li>
                        <li><a className="btn-floating red tooltipped" 
                                data-position="left" 
                                data-delay="50" 
                                data-tooltip="Bar">
                              <i className="material-icons">insert_chart</i></a></li>
                      <li><a className="btn-floating yellow darken-1 tooltipped" 
                              data-position="left" 
                              data-delay="50" 
                              data-tooltip="Pie">
                              <i className="material-icons">pie_chart</i></a></li>
                      <li><a className="btn-floating blue-gray tooltipped" 
                              data-position="left" 
                              data-delay="50" 
                              data-tooltip="Donut">
                              <i className="material-icons">donut_large</i></a></li>
                      <li><a className="btn-floating green tooltipped" 
                              data-position="left" 
                              data-delay="50" 
                              data-tooltip="Bubble">
                              <i className="material-icons">bubble_chart</i></a></li>
                      <li><a className="btn-floating blue tooltipped" 
                              data-position="left" 
                              data-delay="50" 
                              data-tooltip="Lines">
                              <i className="material-icons">show_chart</i></a></li>
                    </ul>
                  </div>
              )
    }
}

const mapStateToProps = (state) => {
    return {
        widgets: state.dashboard.widgets,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
            var widgetVals = {
                id: 1,
                name: 'WIDGET NAME',
                type:'EMPTY',
                drow: 3,
                dcol: 1,
                dsizex: 3,
                dsizey: 2,
          };
        dispatch(addWidget(widgetVals)); 
    }
  }
}

//export default connect(mapStateToProps,mapDispatchToProps)(AddWidgetButton)
export default AddWidgetButton
