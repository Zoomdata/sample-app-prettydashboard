//Echart dark color theme. It can be used when the chart is created
export function dark(){
    var theme = {
      backgroundColor: '',
      color: [
          '#FE8463','#9BCA63','#FAD860','#60C0DD','#0084C6',
          '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
          '#B5C334'
      ],
      title: {
          textStyle: {
              fontWeight: 'normal',
              color: '#fff'
          }
      },
      legend: {
          textStyle: {
              color: '#ccc'
          }
      },
      dataRange: {
          itemWidth: 15,
          color: ['#FFF808','#21BCF9'],
          textStyle: {
              color: '#ccc'
          }
      },

      toolbox: {
          color : ['#fff', '#fff', '#fff', '#fff'],
          effectiveColor : '#FE8463',
          disableColor: '#666'
      },
      tooltip: {
          backgroundColor: 'rgba(250,250,250,0.9)',
          borderColor: '#FDC086',
          borderWidth: 2,
          axisPointer : {            
              type : 'line',        
              lineStyle : {        
                  color: '#aaa'
              },
              crossStyle: {
                  color: '#aaa'
              },
              shadowStyle : {
                  color: 'rgba(200,200,200,0.2)'
              }
          },
          textStyle: {
              color: '#333'
          }
      },

      dataZoom: {
          dataBackgroundColor: '#555',            
          fillerColor: 'rgba(200,200,200,0.2)',  
          handleColor: '#eee'     
      },
      grid: {
          borderWidth: 0
      },

      categoryAxis: {
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: { 
              textStyle: {
                  color: '#ccc'
              }
          },
          splitLine: {   
              show: false
          }
      },

      valueAxis: {
          axisLine: {
              show: false
          },
          axisTick: {           
              show: false
          },
          axisLabel: {         
              textStyle: {    
                  color: '#ccc'
              }
          },
          splitLine: {       
              lineStyle: {  
                  color: ['#aaa'],
                  type: 'dashed'
              }
          },
          splitArea: {           
              show: false
          }
      },

      polar : {
          name : {
              textStyle: {       
                  color: '#ccc'
              }
          },
          axisLine: {            
              lineStyle: {       
                  color: '#ddd'
              }
          },
          splitArea : {
              show : true,
              areaStyle : {
                  color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
              }
          },
          splitLine : {
              lineStyle : {
                  color : '#ddd'
              }
          }
      },

      timeline : {
          label: {
              textStyle:{
                  color: '#ccc'
              }
          },
          lineStyle : {
              color : '#aaa'
          },
          controlStyle : {
              normal : { color : '#fff'},
              emphasis : { color : '#FE8463'}
          },
          symbolSize : 3
      },

      
      line: {
          smooth : true
      },

      
      k: {
          itemStyle: {
              normal: {
                  color: '#FE8463',       
                  color0: '#9BCA63',      
                  lineStyle: {
                      width: 1,
                      color: '#FE8463',   
                      color0: '#9BCA63'   
                  }
              }
          }
      },

      
      radar : {
          symbol: 'emptyCircle',    
          symbolSize:3
          
          
      },

      pie: {
          itemStyle: {
              normal: {
                  borderWidth: 1,
                  borderColor : 'rgba(255, 255, 255, 0.5)'
              },
              emphasis: {
                  borderWidth: 1,
                  borderColor : 'rgba(255, 255, 255, 1)'
              }
          }
      },

      map: {
          itemStyle: {
              normal: {
                  borderColor:'rgba(255, 255, 255, 0.5)',
                  areaStyle: {
                      color: '#ddd'
                  },
                  label: {
                      textStyle: {
                          
                      }
                  }
              },
              emphasis: {                 
                  areaStyle: {
                      color: '#FE8463'
                  },
                  label: {
                      textStyle: {
                          
                      }
                  }
              }
          }
      },

      force : {
          itemStyle: {
              normal: {
                  linkStyle : {
                      color : '#fff'
                  }
              }
          }
      },

      chord : {
          itemStyle : {
              normal : {
                  borderWidth: 1,
                  borderColor: 'rgba(228, 228, 228, 0.2)',
                  chordStyle : {
                      lineStyle : {
                          color : 'rgba(228, 228, 228, 0.2)'
                      }
                  }
              },
              emphasis : {
                  borderWidth: 1,
                  borderColor: 'rgba(228, 228, 228, 0.9)',
                  chordStyle : {
                      lineStyle : {
                          color : 'rgba(228, 228, 228, 0.9)'
                      }
                  }
              }
          }
      },

      gauge : {
          axisLine: {            
              show: true,        
              lineStyle: {       
                  color: [[0.2, '#9BCA63'],[0.8, '#60C0DD'],[1, '#D7504B']],
                  width: 3,
                  shadowColor : '#fff', 
                  shadowBlur: 10
              }
          },
          axisTick: {            
              length :15,        
              lineStyle: {       
                  color: 'auto',
                  shadowColor : '#fff', 
                  shadowBlur: 10
              }
          },
          axisLabel: {            
              textStyle: {       
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', 
                  shadowBlur: 10
              }
          },
          splitLine: {           
              length :25,         
              lineStyle: {       
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', 
                  shadowBlur: 10
              }
          },
          pointer: {           
              shadowColor : '#fff', 
              shadowBlur: 5
          },
          title : {
              textStyle: {       
                  fontWeight: 'bolder',
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', 
                  shadowBlur: 10
              }
          },
          detail : {
              shadowColor : '#fff', 
              shadowBlur: 5,
              offsetCenter: [0, '50%'],       
              textStyle: {       
                  fontWeight: 'bolder',
                  color: '#fff'
              }
          }
      },

      funnel : {
          itemStyle: {
              normal: {
                  borderColor : 'rgba(255, 255, 255, 0.5)',
                  borderWidth: 1
              },
              emphasis: {
                  borderColor : 'rgba(255, 255, 255, 1)',
                  borderWidth: 1
              }
          }
      },

      textStyle: {
          fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
      }
    };
    return theme
}
