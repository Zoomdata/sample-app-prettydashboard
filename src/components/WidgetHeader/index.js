import React from 'react';
import { closeWidget, setChart } from '../../redux/actions';
import { light } from '../../utils/light-theme';
class WidgetHeader extends React.Component{

    constructor(props, context){
        super(props, context)
    }

  setFullScreen(){
    console.log('Fullscreen to '+this.props.id);
    this.props.dispatch(setChart(this.props.id));
  }

  deleteWidget(){
    this.props.dispatch(closeWidget(this.props.id));
  }

    render(){
        return ( <section className="card-header">
            <div className="chart-name">{this.props.name}</div>
                    <a href="#modal1"
                        className="fullscr modal-trigger"
                        onClick={this.setFullScreen.bind(this)}>
                        <i className="material-icons md-light">open_in_new</i>
                    </a>
                    <a href="#" className="del">
                            <i className="material-icons md-light">close</i></a>
                  </section>
               );
    }
}

export default WidgetHeader
