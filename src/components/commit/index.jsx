import React from 'react'
import { Chart, registerShape } from '@antv/g2'
import { isEmpty, find } from 'lodash';
import moment from 'moment'

const showWeeks = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53]
const defaultCommitColor = `#ebedf0-#15B835-#13A930-#11992C-#108A28-#0E7B23
                            -#0C6B1F-#0A5C1A-#094D16-#073D12-#052E0D`

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
    return null
  }

  registerShape = () => {
    registerShape('polygon', 'commitShape', {
      draw(cfg, container)  {
        if (!isEmpty(cfg.points)) {
          const group = container.addGroup();
          const attrs = {
            stroke: '#fff',
            lineWidth: 2,
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
          values: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      },
      week: {
          type: 'cat'
      },
      commit: {
          sync: true
      },
      date:{
          type: 'cat'
      }
    });

    chart.axis('day', {
      grid: null,
      label: {
        style: {
          fontSize:10,
          fill: '#dafef9',
        },
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
          fill: '#dafef9',
          textBaseline: 'top'
        },
        formatter: (val) => {
          const currentWeekDay = find(this.props.data, ['week', Number(val)])
          if (showWeeks.map(w => w+1).includes(currentWeekDay.week)) {
            return moment(currentWeekDay.date).format('MMM')
          }
          return ''
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
    .color('commit', defaultCommitColor)
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