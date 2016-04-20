import React from 'react';
import $ from 'jquery';
import { closeWidget, setChart } from '../redux/actions';
class WidgetHeader extends React.Component{

    constructor(props, context){
        super(props, context)
    }

  closeWidget(){
      this.props.dispatch(closeWidget(this.props.id));
      console.log(this.props.id)
      console.log(this.props.dispatch)
  }

  setFullScreen(){
    this.props.dispatch(setChart(this.props.id));
    console.log('Setting full screen');
  }


    render(){
        return ( <section className="card-header">
            <div className="chart-name">{this.props.name}</div>
                    <a href="#"
                        className="tooltipped"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Filters">
                        <i className="material-icons md-light">filter_list</i>
                    </a>
                    <a href="#"
                        className="tooltipped"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Chart Style">
                        <i className="material-icons md-light">assessment</i>
                    </a>
                    <a href="#"
                        className="tooltipped fullscr"
                        data-position="bottom"
                        data-delay="50"
                        onClick={this.setFullScreen.bind(this)}
                        data-tooltip="Full Screen">
                        <i className="material-icons md-light">open_in_new</i>
                    </a>
                    <a href="#"
                        className="del tooltipped"
                        data-position="bottom"
                        data-delay="50"
                        onClick={this.closeWidget.bind(this)}
                        data-tooltip="Delete">
                            <i className="material-icons md-light">close</i></a>
                  </section>
               );
    }
}

export default WidgetHeader
