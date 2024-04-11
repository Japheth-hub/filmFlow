const { Discount} = require('../db');

module.exports = async (req, res) => {
    try {
        const { code } = req.params;
        const { usedAt } = req.body;

        const usedCode = await Discount.findOne({ where: { code } });
        if (!usedCode) {
            return res.status(404).json({ error: "Discount code not found" });
        }

        usedCode.usedAt = usedAt;
        await usedCode.save();

        res.status(200).json({ message: "Discount code usage updated successfully" });
    } catch (error) {
        console.error("Error updating code usage:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};