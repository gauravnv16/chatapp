// eslint-disable-next-line react/prop-types
function MessageItem({ message, index, time, sentForm }) {
  if (sentForm === "left")
    return (
      <section className="flex">
        <img
          src="https://img.icons8.com/color/48/000000/test-account.png"
          alt="profile"
          className="w-6 h-6 mr-2 rounded-full"
        />
        <section className="flex flex-col items-start mt-3" key={index}>
          <p className="bg-gray-100 p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
            {message}
          </p>
          <p className="text-gray-400 text-xs">{time}</p>
        </section>
      </section>
    );
  else if (sentForm === "right")
    return (
        <div className="flex flex-col items-end">
        <section className="flex ">

        <section className="flex flex-col items-end mt-3" key={index}>
            <p className="bg-blue-500 text-white p-2 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
            {message}
            </p>
        <p className="text-gray-400 text-xs">{time}</p>
      </section>
      <img
            src="https://img.icons8.com/color/48/000000/test-account.png"
            alt="profile"
            className="w-6 h-6 ms-2 rounded-full"
            />
      </section>
        </div>
    );
}

export default MessageItem;


