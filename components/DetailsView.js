import React from 'react';
import { setChartMax } from '../redux/actions';
import VisibleTrend  from './VisibleTrend';
import VisibleDonut  from './VisibleDonut';
import VisibleKPIs  from './VisibleKPIs';

class DetailsView extends React.Component{

      closeFullScreen(){
        this.props.dispatch(setChartMax(false));
      }

    getChart(id, type) {
        if(type.indexOf('KPI') > -1)
            { return (
                    <div>
                        <VisibleKPIs key={id} type={type}/>
                    </div>
                )
            }
        else if(type === 'DONUT')
            { return (
                    <div>
                        <VisibleDonut key={id} type={type}/>
                    </div>
                )
            }
        else if(type === 'TREND') //Trend
            { return ( 
                <div>
                    <VisibleTrend key={id} type={type}/>
                </div>
              )
            }
    }


    render(){
        const styles ={
            row:{marginBottom:0},
            //cols2:{backgroundColor:'#3C4049',minHeight:700},
            input:{color:'#FFF'},
            cols10:{minHeight:'100%',padding:10},
            modalchart:{height:530},
            right:{paddingRight:20,textAlign:'right'}
        }
        return( <div id="modalDetails" className="modal bottom-sheet">
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
                          <div className="row">
                              <div className="col s8">
                                    <h4>{this.props.name}</h4>
                              </div>
                              <div className="col s4">
                                   <div align="right" style={styles.right}>
                                       <a href="#!" 
                                           onClick={this.closeFullScreen.bind(this)}
                                           className="btn modal-action modal-close waves-effect waves-green">
                                           <i className="material-icons left">equalizer</i>
                                           Dashboard</a>
                                   </div>
                              </div>
                          </div>
                        {this.getChart(this.props.id, this.props.zoom)}
                       </div>
                    </div>
                    </div>
                  </div>
              )
    }
}
export default DetailsView
