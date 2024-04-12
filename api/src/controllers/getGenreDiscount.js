const { Discount, Genre } = require('../db');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const discounts = await Discount.findAll({
            include: [
                {
                    model: Genre,
                    through: 'discount_genre',
                    where: { id }
                }
            ],
            attributes: ['code', 'percentage', 'usedAt']
        });

        const discountData = discounts.map(discount => ({
            code: discount.code,
            percentage: discount.percentage,
            usedAt: discount.usedAt
        }));

        res.status(200).json({ discounts: discountData });
    } catch (error) {
        console.error('Error fetching discount data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
