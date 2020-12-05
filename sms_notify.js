const accountSid = 'AC30609ea8fc0742901911612da28b862c';
const authToken = '881d18809ad4a83ce7a938b60ce40b25';
var client = require('twilio')(accountSid, authToken);

const notificationOpts = {
    toBinding: JSON.stringify({
        binding_type: 'sms',
        address: '+17786559277',
    }),
    body: 'You have a hit on BTC Droplet',
};

client.notify
.services('IS62357beca15bec354a5b0315cb1ba63a')
.notifications.create(notificationOpts)
.then(notification => console.log(notification.sid))
.catch(error => console.log(error));

//need to figure out export module syntax here
//module.exports.default = module.exports;