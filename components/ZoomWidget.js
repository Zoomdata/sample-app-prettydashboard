import React from 'react';
import { setChart } from '../redux/actions';
import VisibleTrend  from './VisibleTrend';

class ZoomWidget extends React.Component{

      closeFullScreen(){
        this.props.dispatch(setChart('#'));
        console.log('Setting full screen');
      }


    getChart(type) {
        type='TREND';
        switch (type) {
            case 'KPI':
                return (
                    <div>
                        <VisibleKPIs/>
                    </div>
                )
            case 'DONUT':
                return (
                    <div>
                        <VisibleDonut/>
                    </div>
                )
            case 'TREND':
                return (
                    <div>
                        <VisibleTrend />
                    </div>
                )
        };
    }


    render(){
        const styles ={
            row:{marginBottom:0},
            cols2:{backgroundColor:'#3C4049',minHeight:660},
            input:{color:'#FFF'},
            cols10:{minHeight:'100%'},
            modalchart:{height:550},
            right:{paddingRight:20,textAlign:'right'}
        }
        return( <div id="modal1" className="modal bottom-sheet">
                    <div className="modal-content">
                    <div className="row" style={styles.row}>
                      <div className="col s2" style={styles.cols2}>
                          <br/>
                          <br/>
                        <div className="input-field" style={styles.input}>
                            <input id="filter1" type="text" className="validate"/>
                          <label>Filter 1</label>
                        </div>
                        <div className="input-field" style={styles.input}>
                            <input id="filter2" type="text" className="validate"/>
                          <label>Filter 2</label>
                        </div>
                      </div>
                      <div className="col s10" style={styles.cols10} >
                            <div id="modalchart" style={{height: 550}}></div>
                       </div>
                       <div align="right" style={styles.right}>
                           <a href="#!" 
                               onClick={this.closeFullScreen.bind(this)}
                               className="btn modal-action modal-close waves-effect waves-green">Go Back</a>
                       </div>
                    </div>
                    </div>
                  </div>
              )
    }
}
//{this.getChart(this.props.zoom)}
export default ZoomWidget
