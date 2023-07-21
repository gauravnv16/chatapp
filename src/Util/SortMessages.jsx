function SortMessages(messages) {
    const sortedMessages = messages.sort((a, b) => {
      return a.time2 - b.time2;
    });
  
    return sortedMessages;
  }

  
export default SortMessages