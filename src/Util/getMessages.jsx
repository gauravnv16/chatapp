import { ref, get } from 'firebase/database';
import { database } from '../config/firebaseConfig';

// Function to get messages from the Realtime Database
const getMessages = async (roomId) => {
  const messagesRef = ref(database, `messages/${roomId}`);
  try {
    const snapshot = await get(messagesRef);

    if (snapshot.exists()) {
      // 'snapshot.val()' contains all the messages in the given room
      return snapshot.val();
    } else {
      // If the room doesn't exist or has no messages yet, return an empty array or object
      return {};
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export default getMessages;