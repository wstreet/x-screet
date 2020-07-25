import React from 'react';
import { Chart, Util } from '@antv/g2'


class Language extends React.Component {
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

    componentDidMount() {
        const chart = new Chart({
          container: this.props.id,
          autoFit: true,
          height: 252,
        });
        chart.data(this.props.data);

        chart.coordinate('theta', {
          radius: 0.75
        });
        chart.tooltip({
          showMarkers: false
        });
        chart
          .interval()
          .adjust('stack')
          .position('value')
          .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
          .style({ opacity: 0.4 })
          .state({
              active: {
              style: (element) => {
                  const shape = element.shape;
                  return {
                  matrix: Util.zoom(shape, 1.1),
                  }
              }
              }
          })
          .label('type', (val) => {
              return {
                style: {
                    fill: '#dafef9',
                    fontSize: 12,
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                },
                content: (obj) => {
                    return obj.type + '\n' + obj.value + '%';
                },
              };
          });

        chart.interaction('element-single-selected');

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

export default Language;
