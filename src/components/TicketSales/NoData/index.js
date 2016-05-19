import React from 'react';
import './style.css';
class NoData extends React.Component{

    render() {
        return (
              <div className="no-data" style={{height:this.props.height}}>
                  No matching data! 
              </div>
        );
    }

}
export default NoData
