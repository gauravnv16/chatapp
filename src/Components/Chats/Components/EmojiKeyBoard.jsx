function EmojiKeyboard() {
    const icons = [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😃",
      "😄",
      "😅",
      "😆",
      "😉",
      "😊",
      "😋",
      "😎",
      "😍",
      "😘",
    ];
    return (
      <section
        style={{
          width: "250px",
          display: "none",
          position: "absolute",
          bottom: "70px",
        }}
        id="emojiKeyboard"
        className="p-2 bg-gray-100 mb-2 rounded ml-2"
      >
        <h1 className="text-2x mb-3">
          {/* back */}
          <i
            className="fas fa-arrow-left text-blue-500 cursor-pointer mr-2"
            onClick={() => {
              document.getElementById("emojiKeyboard").style.display = "none";
            }}
          ></i>
          Emojis
        </h1>
  
        <section className="flex flex-wrap justify-center">
          {icons.map((icon, index) => (
            <p
              className="text-2xl cursor-pointer"
              key={index}
              onClick={() => {
                document.getElementById("message").value += icon;
              }}
            >
              {icon}
            </p>
          ))}
        </section>
      </section>
    );
}

export default EmojiKeyboard;