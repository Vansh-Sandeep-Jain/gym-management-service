// services/slotScheduler.ts
import cron from 'node-cron';
import Slot from '../models/slot.model';

// Function to update slot states
const updateSlotStates = async () => {
  try {
    const now = new Date();
    console.log(`Running slot state update at ${now.toISOString()}`);

    // 1. Update slots that should be 'scheduled' (between startDate and endDate)
    await Slot.updateMany(
      {
        startDate: { $lte: now },
        endDate: { $gte: now },
        state: { $nin: ['cancelled', 'scheduled', 'inprogress'] }
      },
      { state: 'scheduled' }
    );

    // 2. Update slots that should be 'inprogress' (between startTime and endTime within active date range)
    await Slot.updateMany(
      {
        startDate: { $lte: now },
        endDate: { $gte: now },
        startTime: { $lte: now },
        endTime: { $gte: now },
        state: { $nin: ['cancelled', 'inprogress'] }
      },
      { state: 'inprogress' }
    );

    // 3. Update slots that should be 'finished' (after endDate)
    await Slot.updateMany(
      {
        endDate: { $lt: now },
        state: { $ne: 'finished' }
      },
      { state: 'finished' }
    );

    // Note: Slots before startDate remain 'available' (default state)

  } catch (error) {
    console.error('Error in slot scheduler:', error);
  }
};

// Start the scheduler
export const startSlotScheduler = () => {
  // Run every 10 minutes
  const task = cron.schedule('*/10 * * * *', updateSlotStates);
  console.log('Slot scheduler started (running every 10 minutes)');
  
  return () => {
    task.stop();
    console.log('Slot scheduler stopped');
  };
};