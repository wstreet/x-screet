
  
  export const getContribution = (username = 'wstreet') => {
      return fetch(`https://api.bloggify.net/gh-calendar/?username=${username}`)
      .then(response => response.text())
      .then(data => {
          const div = document.createElement('div')
          div.innerHTML = data
          const rects = div.querySelectorAll('rect')
          const points = []
          rects.forEach(rect => {
              points.push({
                  ...rect.dataset
              })
          })
  
          return points
      })
  }