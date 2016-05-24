import React from 'react';
/*
 This component renders the loading spinner used the first time the dashboard renders.
 It uses materialize.css
*/
class LoaderData extends React.Component{

    render() {
        return (
            <div className="loading">
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
        );
    }

}
export default LoaderData
