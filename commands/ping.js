
module.exports = {
    name: 'ping',
    description: `test command`,
    run: async (client, message, args) => {
   return message.send(`ping`)
  }
}