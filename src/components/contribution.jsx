import React from 'react'
import { Chart, registerShape } from '@antv/g2'
import { isEmpty } from 'lodash';
import * as Api from './api'


class Contribution extends React.Component {
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
    
          if (cfg.data.lastWeek) {
            const linePath = [
              ['M', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y]
            ];
            // 最后一周的多边形添加右侧边框
            group.addShape('path', {
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 4,
                stroke: '#404040'
              }
            });
            if (cfg.data.lastDay) {
              group.addShape('path', {
                attrs: {
                  path: this.parsePath([
                    ['M', points[1].x, points[1].y],
                    ['L', points[2].x, points[2].y]
                  ]),
                  lineWidth: 4,
                  stroke: '#404040'
                }
              });
            }
          }
    
          return group;
        }
      }
    });
  }
  componentDidMount() {
    this.registerShape()
    async function fetchData() {
      const data = await Api.getCommits()
  
      const chart = new Chart({
        container: 'contribution',
        autoFit: true,
        height: 100,
        padding: [30, 10, 10, 30]
        });
        chart.data(data);
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
     }
     fetchData()
  }

  render() {
    return (
      <div id="contribution"></div>
    )
  }
}

export default Contribution