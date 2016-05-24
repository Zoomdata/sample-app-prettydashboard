import React from 'react';
import './style.css';
/*
 This component renders a simple 'No data' information when there is no matching
 data with the selected filters
*/
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
