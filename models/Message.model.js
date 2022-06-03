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

        // number: {
        //     type: Number,
        //     required: true
        // }
    },
    {
        timestamps: true,
    }
)
const Message = model("Message", messageSchema);



module.exports = Message;
