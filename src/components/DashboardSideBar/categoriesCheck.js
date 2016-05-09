import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { changeCategoriesFilter } from '../../redux/actions';

class CategoriesCheck extends React.Component{

  onChange(e){
        this.props.dispatch(changeCategoriesFilter(e.target.id))
      }

    render() {
        return (  
            <div>
              <div className="options">
                  <b>Choose Category</b>
              </div>
                {this.props.categories.map((c, i) => {
                    return( <div className="options" key={i}>
                              <input type="checkbox" 
                                  onChange={this.onChange.bind(this)}
                                  checked={c.checked}
                                  id={c.val}
                                  className="filled-in" />
                              <label htmlFor={c.val}>{c.val}</label>
                            </div>
                    )})}
                </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        categories: state.chartFilters.categories,
    }
};

export default connect(mapStateToProps)(CategoriesCheck);
