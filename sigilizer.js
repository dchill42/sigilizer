const Discord = require('discord.js');
const Winston = require('winston');
const crc32 = require('crc32');

const Auth = require('./auth.json');
const Layout = require('./layout');

const { LOG_FILE, PNG_DIR } = require('./constants');

class Sigilizer {
  constructor() {
    this.logger = Winston.createLogger({
      transports: [
        new Winston.transports.Console({ colorize: true }),
        new Winston.transports.File({ filename: LOG_FILE })
      ],
      format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.simple()
      )
    });
    this.client = new Discord.Client();
  }

  login(token) {
    this.client.once('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.login(token);
  }

  onReady() {
    this.myId = this.client.user.id;
    this.logger.info(`Connected as: ${this.client.user.username} (${this.myId})`);
  }

  onMessage(msg) {
    const dm = this.messaged(msg);
    if (!dm && !this.mentioned(msg)) return;

    const input = msg.content.replace(/<@![^>]*>\s*/, '');
    const base = this.digest(input);
    const unique = this.reduce(base);
    const word = unique.join('');
    const layout = new Layout();
    const path = `./${PNG_DIR}/${msg.author.username}_${word}.png`;

    layout.arrange(unique);
    layout.saveAs(path);
    this.logger.info(`Saved ${path}`);

    if (dm || this.fromAdmin(msg)) return msg.channel.send(word, { files: [path] });

    msg.author.send(word, { files: [path] });
    msg.channel.send(`Sent you a DM, ${msg.author.toString()}`);
  }

  messaged(msg) {
    return msg.channel.type == 'dm' && msg.author.id != this.myId;
  }

  mentioned(msg) {
    return (msg.mentions.users.find(u => { return u.id === this.myId }) ||
      msg.mentions.roles.find(r => { return r.id === this.myId }));
  }

  fromAdmin(msg) {
    return msg.member && msg.member.hasPermission('ADMINISTRATOR');
  }

  digest(input) {
    const display = input.substr(0, 50);
    const crc = crc32(input);
    const base = Buffer.from(`${crc}`, 'utf8').toString('base64');

    this.logger.info(`Digest ${display} (${crc}) [${base}]`);
    return base;
  }

  reduce(base) {
    const skip = ['+', '/', '='];
    const chars = base.toUpperCase().split('');
    return chars.filter((v, i, a) => { return !skip.includes(v) && a.indexOf(v) === i });
  }
}

const sigilizer = new Sigilizer();
sigilizer.login(Auth.token);
