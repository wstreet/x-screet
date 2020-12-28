module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ],
    presets: [
      [
        '@babel/env',
        {
          targets: {
              chrome: '67',
          },
          useBuiltIns: 'usage',
          modules: false,
          corejs: {
              'version': 3,
              'proposals': true
          }
        }
      ],
      '@babel/react'
    ]
  }
}