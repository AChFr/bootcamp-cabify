const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {

        destination: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true
        },



        status: {
            type: String,
            enum: ["sent", "unconfirmed", "not sent"],
            required: true
        }

    },
    {
        timestamps: true,
    }
)
const Message = model("Message", messageSchema);



module.exports = Message;
