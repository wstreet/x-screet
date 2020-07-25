import React from 'react'
import { Chart, registerShape } from '@antv/g2'
import { isEmpty } from 'lodash';


class Commit extends React.Component {
  state = {
    data: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        data: nextProps.data
      }
    }
  }

  registerShape = () => {
    registerShape('polygon', 'commitShape', {
      draw(cfg, container)  {
        if (!isEmpty(cfg.points)) {
          const group = container.addGroup();
          const attrs = {
            stroke: '#fff',
            lineWidth: 1,
            fill: cfg.color,
          };
          const points  = cfg.points;
          
          const path = [
            ['M', points[0].x, points[0].y],
            ['L', points[1].x, points[1].y],
            ['L', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['Z']
          ];
          attrs.path = this.parsePath(path);
          group.addShape('path', {
            attrs
          });
    
          
    
          return group;
        }
      }
    });
  }

  componentDidMount() {
    this.registerShape()
  
    const chart = new Chart({
      container: this.props.id,
      autoFit: true,
      height: 100,
      padding: [30, 10, 10, 50]
      });

    chart.data(this.state.data);
    chart.scale({
      day: {
          type: 'cat',
          values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      },
      week: {
          type: 'cat'
      },
      count: {
          sync: true
      },
      date:{
          type: 'cat'
      }
    });

    chart.axis('week', {
      position: 'bottom',
      tickLine: null,
      line: null,
      label: {
        offset: 12,
        style: {
          fontSize:10,
          fill: '#666',
          textBaseline: 'top'
        },
        formatter: val => {
          if (val === '2') {
              return 'MAY';
          } else if (val === '6') {
              return 'JUN';
          } else if (val === '10') {
              return 'JUL';
          } else if (val === '15') {
              return 'AUG';
          } else if (val === '19') {
              return 'SEP';
          } else if (val === '24') {
              return 'OCT';
          }
          return '';
        }
      }
    });
    chart.legend(false);
    chart.tooltip({
      title: 'date',
      showMarkers: false,
    });
    chart.coordinate().reflect('y');
    chart.polygon().position('week*day*date')
    .color('commits', '#9be9a8-#40c463-#216e39')
    .shape('commitShape');

    chart.interaction('element-active');
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

export default Commit