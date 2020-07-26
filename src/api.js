import moment from 'moment'
  
  export const getContribution = (username = 'wstreet') => {
      return fetch(`https://api.bloggify.net/gh-calendar/?username=${username}`)
      .then(res => res.text())
      .then(data => {
          const div = document.createElement('div')
          div.innerHTML = data
          const rects = div.querySelectorAll('rect')
          const points = []
          rects.forEach((rect, index) => {
              const { count, date } = rect.dataset
              points.push({
                commit: Number(count),
                date,
                day: moment(date).weekday(),
                month: moment(date).month(),
                week: Math.floor(index / 7)
              })
          })
          return points
      })
  }

  export const getLanguage = (username = 'wstreet') => {
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(repos => {
        const languageMap = {}
        repos.forEach(repo => {
            if (languageMap[repo.language]) {
                languageMap[repo.language] += 1
            } else {
                languageMap[repo.language] = 1
            }
        })
        const languageList = Object.keys(languageMap).map(key => {
            return {
                type: key === 'null' ? 'other' : key,
                value: parseFloat(((languageMap[key] / repos.length) * 100).toFixed(2))
            }
        })
        return languageList
    })
  }

  export const getFollowing = (username = 'wstreet') => {
    return fetch(`https://api.github.com/users/${username}/following`)
    .then(res => res.json())
  }

  
  export const getfollowers = (username = 'wstreet') => {
    return fetch(`https://api.github.com/users/${username}/followers`)
    .then(res => res.json())
    .then(list => list.reverse())
  }

  export const getUserInfo = (username = 'wstreet') => {
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
  }