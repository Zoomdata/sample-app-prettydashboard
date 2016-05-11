import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-root/ag-grid.css';
import 'ag-grid-root/theme-dark.css';
var numeral = require('numeral');
let pageSize = 100;;
let allOfTheData;

export default class Pivot extends Component {
    constructor(state,context){
        super(state,context);
        this.state = {prevfilter: 'All'};
    }
	onGridReady(params) {
        this.api = params.api;
        this.setupData();
    }

    setupData() {
    	if (!allOfTheData || allOfTheData.length === 0 || this.props.filter !== this.state.prevfilter) {
        	allOfTheData = this.obtainPivotItems(this.props);       	
        }
        this.createNewDatasource();
        this.api.sizeColumnsToFit();
    }

    obtainPivotItems(props) {
    	var items;
		if (!props.items) {
			items = [];
		} else {
                items = props.items;
		}
        let pivotItems = []
        items.forEach(function(item){
            pivotItems.push({
                catname: item.group[0],
                eventname: item.group[1],
                pricepaid: item.current.metrics.pricepaid.sum,
                commission: item.current.metrics.commission.sum,
                avgsaleprice: item.current.metrics.pricepaid.sum /  item.current.metrics.qtysold.sum,
                avgcommission: item.current.metrics.commission.sum /  item.current.metrics.qtysold.sum 
            });
        })
        if(pivotItems.length == 0){
            console.log('No data');
        }
		return pivotItems;
    }

    componentDidUpdate() {
        if (!this.api) {
            return;
        }
        this.setupData();
    }

	createNewDatasource() {
	    if (!allOfTheData) {
	        return;
	    }

	    var dataSource = {
	        rowCount: allOfTheData.length,
	        pageSize: pageSize,
	        getRows: function (params) {
                allOfTheData = this.sortAndFilter(params.sortModel, params.filterModel);
	            var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                var lastRow = -1;
                if (allOfTheData.length <= params.endRow) {
                    lastRow = allOfTheData.length;
                }

                params.successCallback(rowsThisPage, lastRow);
	        },
            sortAndFilter: function(sortModel, filterModel) {
                return this.sortData(sortModel, allOfTheData);
            },
            sortData: function(sortModel, data) {
                var sortPresent = sortModel && sortModel.length > 0;
                if (!sortPresent) {
                    return data;
                }
                // do an in memory sort of the data, across all the fields
                var resultOfSort = data.slice();
                resultOfSort.sort(function(a,b) {
                    for (var k = 0; k < sortModel.length; k++) {
                        var sortColModel = sortModel[k];
                        var valueA = a[sortColModel.colId];
                        var valueB = b[sortColModel.colId];
                        // this filter didn't find a difference, move onto the next one
                        if (valueA==valueB) {
                            continue;
                        }
                        var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                        if (valueA > valueB) {
                            return sortDirection;
                        } else {
                            return sortDirection * -1;
                        }
                    }
                    // no filters found a difference
                    return 0;
                });
                return resultOfSort;
            }
	    };

	    this.api.setDatasource(dataSource);
	}

	onPageSizeChanged (newPageSize) {
	    pageSize = new Number(newPageSize);
	    createNewDatasource();
	}

    createColDefs() {
        const leftAlignStyle = {
            'text-align': 'left'
        }
        const centerAlignStyle = {
            'text-align': 'center'
        }
        const rightAlignStyle = {
            'text-align': 'right'
        }
        const makeAlignStyle = {
            'border-left': '1px solid #808080',
            'text-align': 'left'
        }
        const moneyRenderer = function(params) {
            return numeral(params.value).format('$0,000.00');
        }
        const numberRenderer = function(params) {
            return numeral(params.value).format('0.00');
        }

        let width = (this.props.width > 160) ? this.props.width : 160
        let columnDefs = [
            {
                headerName: 'Category',
                field: 'catname',
                width: 43 * width / 100,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: leftAlignStyle
            },
            {
                headerName: 'Event Name',
                field: 'eventname',
                width: width,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: leftAlignStyle
            },
            {
                headerName: 'Price<br>paid',
                field: 'pricepaid',
                width: 57 * width / 100,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: centerAlignStyle,
                cellRenderer: moneyRenderer
            },
            {
                headerName: 'Commission',
                field: 'commission',
                width: 64 * width / 100,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: centerAlignStyle,
                cellRenderer: moneyRenderer
            }
            ,
            {
                headerName: 'Avg Sales<br>Price',
                field: 'avgsaleprice',
                width: 43 * width / 100,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: centerAlignStyle,
                cellRenderer: numberRenderer
            },
            {
                headerName: 'Avg<br>Commission',
                field: 'avgcommission',
                width: 50 * width / 100,
                suppressSorting: false,
                suppressSizeToFit: true,
                suppressMenu: true,
                cellStyle: centerAlignStyle,
                cellRenderer: numberRenderer
            }
        ];
        return columnDefs;
    }

    onMouseOver(e){
        //document.body.style.overflowY='scroll'
        //document.body.style.position='fixed'
    }
    onMouseOut(){
        //document.body.style.overflowY='auto'
        //document.body.style.position='static'
    }

    componentWillUnmount() {
        this.api.destroy();
    }
    componentWillMount() {
        this.columnDefs = this.createColDefs();
    }

	render(){
		var columnDefs = this.createColDefs();
	  	return (
            <div className='ag-darkdash' 
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                style={{height: this.props.height}} >
			  		<AgGridReact 
			  			rowData={allOfTheData}
			  			onGridReady={this.onGridReady.bind(this)}
						columnDefs={columnDefs}
	                    enableServerSideSorting='true'
	                    enableFilter='true'
	                    headerHeight='55'
	                    rowHeight='28'
	                    suppressRowClickSelection='true'
	                    suppressCellSelection='true'
	                    rowModelType='pagination'
		             />
	             </div>


    	)
	}
}
