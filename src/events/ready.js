const client = require('../../src/index');

client.on('ready', () => {
    client.user.setActivity(">help", { type: 3 });
    
    console.log(`${client.user.tag} is now online!`);
})

