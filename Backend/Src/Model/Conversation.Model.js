import mongoose from "mongoose";

// Define Group Schema
const GroupSchema = new mongoose.Schema({

  GroupName: {
    type: String,
    required: true
  },
  GroupImage: {
    type: String,
    default: ""
  },
  GroupDescription: {
    type: String,
    default: ""
  },
  GroupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  AddMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  GroupMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
}, { timestamps: true });

// Define Conversation Schema\

const ConversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
}, { timestamps: true });

// Create Models
const Group = mongoose.model("Group", GroupSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);

export { Group, Conversation };
