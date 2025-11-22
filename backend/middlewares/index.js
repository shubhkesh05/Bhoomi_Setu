import mongoose from 'mongoose';
import User from './models/user.js';
import LandRecord from './models/LandRecord.js';
import ChatbotInteraction from './models/ChatbotInteraction.js';


mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Database connected');
  runTests();
}).catch(err => {
  console.error('❌ DB connection error:', err);
});

async function runTests() {
  try {
    console.log('🚀 Running test...');

    let user1 = await User.findOne({ aadhaarNumber: '123456799012' });
    if (user1) {
      console.log('ℹ️ User1 already exists:', user1);
    } else {
      user1 = await User.create({
        aadhaarNumber: '123456799012',
        name: 'Shivam Jha',
        phoneNumber: '9876543210',
        role: 'citizen'
      });
      console.log('✅ User1 created:', user1);
    }

    
    let user2 = await User.findOne({ aadhaarNumber: '193406789012' });
    if (user2) {
      console.log('ℹ️ User2 already exists:', user2);
    } else {
      user2 = await User.create({
        aadhaarNumber: '193406789012',
        name: 'Ravi Kumar',
        phoneNumber: '9998887776',
        role: 'citizen'
      });
      console.log('✅ User2 created:', user2);
    }

    const land = await LandRecord.create({
      owner: user1._id,
      surveyNumber: 'SURV1234',
      village: 'Test Village',
      district: 'Test District',
      state: 'Test State',
      areaInAcres: 2.5,
      landType: 'agricultural',
      geoCoordinates: {
        type: 'Point',
        coordinates: [77.1234, 28.5678]
      }
    });
    console.log('✅ Land record created:', land);

    const chat = await ChatbotInteraction.create({
      user: user1._id,
      platform: 'whatsapp',
      message: 'Hello',
      intent: 'greeting',
      response: 'Hi, how can I help you?'
    });
    console.log('✅ Chatbot interaction logged:', chat);

    console.log('\n🎉 Test completed. Press CTRL+C to exit.');
  } catch (err) {
    console.error('❌ Error during test:', err);
  }
}
