if (process.env.NODE_ENV === 'test') {
  console.info = console.log = console.warn = console.error = () => ''
}
