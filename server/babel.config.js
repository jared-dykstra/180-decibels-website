module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-react-jsx', 'macros'],
  sourceMaps: true,
  retainLines: true
}
