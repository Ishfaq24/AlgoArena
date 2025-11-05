import { StreamClient } from '@stream-io/node-sdk';
import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('Missing STREAM_API_KEY or STREAM_API_SECRET in environment variables.');
}

export const streamClient = new StreamClient(apiKey,apiSecret);
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log(`Stream user with ID ${userData.id} upserted successfully.`);
    return userData;
  } catch (error) {
    console.error('Error upserting Stream user:', error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId, { markMessagesDeleted: true });
    console.log(`Stream user with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting Stream user:', error);
  }
};
