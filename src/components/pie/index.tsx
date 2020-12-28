import React, { useEffect, useState, ReactElement } from 'react';
import { Chart, Util } from '@antv/g2'
interface LanguageProps {
  id: string,
  data: Array<string>
}

const Language: React.FC<LanguageProps> = ({ id, data }): ReactElement => {
  const [chart, setChart] = useState(null)
  // 挂载
  useEffect(() => {
    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 252,
    });
    chart.data(data);

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
    setChart(chart)
  }, [id])

  useEffect(() => {
    chart.changeData(data);
    chart.render();
  }, [data])


  return (
    <div id={id}></div>
  )
}


export default Language;