import React from 'react'
import { Chart } from '@antv/g2'


class Column extends React.Component {
  state = {
    data: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        data: nextProps.data
      }
    }
    return null
  }


  componentDidMount() {
    const chart = new Chart({
      container: this.props.id,
      autoFit: true,
      height: 400,
      padding: [30, 20, 120, 20]
    });
    
    chart.data(this.state.data);
    chart.scale('count', {
      nice: true,
    });
    
    chart.tooltip({
      showMarkers: false,
      shared: true,
    });
    
    chart
      .interval()
      .position('name*count')
      .color('type')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);
    
    chart.interaction('active-region');
    
    chart.render();
    this.chart = chart
  }

  componentDidUpdate() {
    this.chart.changeData(this.state.data);
    this.chart.render();
  }

 

  render() {
    return (
      <div id={this.props.id}></div>
    )
  }
}

export default Column