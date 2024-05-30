const cron = require('node-cron')
const subscriptionController = require('../controllers/subscriptionController')

// Deactivate expired plans every day at midnight
cron.schedule('0 0  * * *', async () => {
  try {
    await subscriptionController.deactivateExpiredSubscriptions()
    console.log('Expired plans deactivation completed.')
  } catch (error) {
    console.error('Error deactivating plans:', error)
  }
})
