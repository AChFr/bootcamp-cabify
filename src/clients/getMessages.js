import { mainMessage, reserveMessage } from "../models/message.js";

export default (conditions = {}) => mainMessage.find(conditions);
