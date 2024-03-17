const express = require('express');
const bodyParser = require('body-parser');
const {
  calculatePrice,
} = require('./services/priceCalculator');
const swaggerApp = require('./swagger/swagger');

/**
 * @swagger
 * /calculate-price:
 *   post:
 *     summary: Calculate the price based on provided parameters.
 *     description: Calculate the total price for delivering food items based on various factors.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               organization_id:
 *                 type: string
 *               total_distance:
 *                 type: number
 *               item_type:
 *                 type: string
 *             required:
 *               - zone
 *               - organization_id
 *               - total_distance
 *               - item_type
 *     responses:
 *       '200':
 *         description: Successful response with the total price.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 */

const app = express();

app.use(bodyParser.json());

app.use(swaggerApp);

app.post('/calculate-price', async (req, res) => {
  try {
    const {
      zone,
      organization_id,
      total_distance,
      item_type,
    } = req.body;

    const totalPrice = await calculatePrice(zone, organization_id, total_distance, item_type);

    if (!Number.isNaN(totalPrice)) {
      res.json({
        total_price: totalPrice,
      });
    } else {
      throw new Error('Invalid total price');
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
