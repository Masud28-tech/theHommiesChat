const Messages = require('../model/messageModel');

module.exports.sendMessage = async (req, res, next) => {
    try {
        const { to, from, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [to, from],
            sender: from,
        });

        if (data) return res.json({ msg: "Message sent and added to db successfully." });

        return res.json({ msg: "Faild to send the message and add to db!" });

    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { to, from } = req.body;
        const messages = await Messages
            .find({
                users: { $all: [from, to], }
            })
            .sort({ updatedAt: 1 })

        const messagesToShow = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        return res.json(messagesToShow);

    } catch (ex) {
        next(ex);
    }
}

module.exports.deleteAllMessages = async (req, res, next) => {
    try {
        const { to, from } = req.body;
        const data = await Messages
            .deleteMany({
                users: { $all: [from, to], }
            }).catch(function (error) {
                console.log(error); // Failure
            });

        if (data) return res.json({ msg: "Messages deleted from db successfully." });
        return res.json({ msg: "Faild to delete message from db!" });


    } catch (ex) {
        next(ex);
    }
}