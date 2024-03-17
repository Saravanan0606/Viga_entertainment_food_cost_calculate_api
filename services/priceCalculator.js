const {
  getPricingFromDatabase,
} = require('../database/db');

async function calculatePrice(zone, organization_id, total_distance) {
  try {
    const pricing = await getPricingFromDatabase(zone, organization_id);

    let totalPrice = 0;

    if (pricing) {
      if (total_distance > pricing.base_distance_in_km) {
        const distanceBeyondBase = total_distance - pricing.base_distance_in_km;
        const perKmPrice = parseFloat(pricing.km_price);
        const fixPrice = parseFloat(pricing.fix_price);
        totalPrice = fixPrice + perKmPrice * distanceBeyondBase;
      } else {
        totalPrice = parseFloat(pricing.fix_price);
      }
    } else {
      throw new Error('Pricing information not available for the provided zone and organization ID');
    }

    return totalPrice * 100;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  calculatePrice,
};
