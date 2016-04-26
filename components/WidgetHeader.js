import React from 'react';
import { closeWidget, setChart } from '../redux/actions';
import { light } from '../utils/light-theme';
class WidgetHeader extends React.Component{

    constructor(props, context){
        super(props, context)
    }

  setFullScreen(){
      console.log(this.props.id);
    this.props.dispatch(setChart(this.props.id));
  }

  handleCloseWidget(){
    this.props.dispatch(closeWidget(this.props.id));
  }

    render(){
        return ( <section className="card-header">
            <div className="chart-name">{this.props.name}</div>
                    <a href="#modalDetails"
                        className="fullscr modal-trigger"
                        data-position="bottom"
                        onClick={this.setFullScreen.bind(this)}
                        data-delay="50"
                        data-tooltip="Full Screen">
                        <i className="material-icons md-light">open_in_new</i>
                    </a>
                    <a href="#"
                        className="del"
                        data-position="bottom"
                        onClick={this.handleCloseWidget.bind(this)}
                        data-delay="10">
                            <i className="material-icons md-light">close</i></a>
                  </section>
               );
    }
}

export default WidgetHeader
