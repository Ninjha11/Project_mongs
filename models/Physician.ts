import mongoose from 'mongoose';

const PhysicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Physician || mongoose.model('Physician', PhysicianSchema);