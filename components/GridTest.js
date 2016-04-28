import React from 'react';
import ReactGridLayout from 'react-grid-layout';
var _ = require('lodash');

class Widget extends React.Component{
    render(){
                let styles={
                    widget:{backgroundColor:'#FFF'},
                    head:{
                        backgroundColor:'#DDD', 
                        cursor:'move',
                        textAlign:'center'},
                }
        return(
            //jsx code
                <div id={this.props.id} style={styles.widget}>
                    <div 
                        className="header" style={styles.head}>
                        Header
                        <button>x</button>
                    </div> 
                    {this.props.id}
                </div>
              )
    }
}

class GridTest extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = {
            layout:[
      { i: '1', name: 'TREND CHART', type:'TREND',  x: 0, y: 5, h:10, w:6, width: 600, height: 400 },
      { i: '2', name: 'LOANS BY GRADE', type:'DONUT', x: 6, y: 0, h:10, w:6, width: 600, height:400 },
      { i: '3', name: 'PORTFOLIO', type:'KPIPORTFOLIO', x: 0, y: 0, h:5, w:2,  width: 200, height:200 },
      { i: '4', name: 'O/S', type:'KPIOS', x: 2, y: 0, h:5, w:2, width: 200, height:200 },
      { i: '5', name: 'DELINQ. RECENCY', type:'KPIDELINQUENCYRECENCY', x: 4, y: 0, h:5, w:2, width: 200, height:200 },
      { i: '6', name: 'DEF PROPENSITY', type:'KPIDEFAULTPROPENSITY', x: 6, y: 10, h:5, w:2, width: 200, height:200 },
            ],
            counter: 4
        };
    }

    addItem(){
          this.setState({
              layout: this.state.layout.concat( {i: ''+this.state.counter, x: 4, y: 0, w: 1, h: 2}),
              counter: this.state.counter + 1
          });
        //code
    }

    removeItem(i){
        console.log('removing', i);
        this.setState({layout: _.reject(this.state.layout, {i: i})});
    }

    onResize(layout, oldLayoutItem, layoutItem, placeholder, e){
        let elem = document.getElementById(layoutItem.i)
        console.log(elem.offsetHeight);
        console.log(elem.offsetWidth);
    }

    render(){
                let styles={
                    widget:{backgroundColor:'#FFF',width:'1800px'},
                    head:{
                        backgroundColor:'#DDD', 
                        cursor:'move',
                        textAlign:'center'},
                }
                return (
                    <div>
                        <button onClick={this.addItem.bind(this)}>Add</button>
                        <ReactGridLayout 
                            className="layout" 
                            layout={this.state.layout} 
                            draggableHandle={'div.header, div.header *'}
                            cols={52} 
                            onResize={this.onResize}
                            rowHeight={30} 
                            width={5200}>
                            { this.state.layout.map((w) => {
                                return (
                                    <div key={w.i} style={styles.widget}>
                                        <Widget id={w.i}/>
                                    </div>
                                )})
                            }
                      </ReactGridLayout>
                    </div>
                )
    }
}

export default GridTest
