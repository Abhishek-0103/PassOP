import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passArray, setpassArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setpassArray(JSON.parse(password));
    }
  }, []);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    toast("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const show = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setpassArray([...passArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passArray, { ...form, id: uuidv4() }])
    );
    setform({ url: "", username: "", password: "" });
  };

  const handledelete = (id) => {
    setpassArray(passArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passArray.filter((item) => item.id !== id))
    );
  };

  const handleedit = (id) => {
    setform(passArray.filter((i) => i.id === id)[0]);
    setpassArray(passArray.filter((item) => item.id !== id));
  };

  return (
    <>
      <ToastContainer
        toastClassName={() =>
          "relative flex p-3 bg-gradient-to-r from-purple-500 via-purple-600 to-black text-white rounded-lg shadow-lg"
        }
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-900 text-white flex flex-col">
        <main className="mt-20 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-2">
            &lt;<span className="text-purple-400">PassOP</span>/&gt;
          </h1>
          <p className="text-gray-400 mb-6">Your own Password Manager</p>
          <form action="">
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
              <input
                type="text"
                required
                value={form.url}
                name="url"
                onChange={handlechange}
                placeholder="Enter website URL"
                className="w-full mb-3 px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                value={form.username}
                required
                name="username"
                onChange={handlechange}
                placeholder="Enter Username"
                className="w-full mb-3 px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  name="password"
                  onChange={handlechange}
                  required
                  placeholder="Enter Password"
                  className="w-full mb-4 px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={show}
                >
                  {showPassword ? (
                    <img className="w-5 invert" src="/icons/ie.svg" alt="" />
                  ) : (
                    <img className="w-5 invert" src="/icons/e.svg" alt="" />
                  )}
                </span>
              </div>

              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                onClick={handlesubmit}
              >
                Save Password
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-white">Your Passwords</h2>
          </div>

          <div className="mt-5 mb-20 w-full max-w-4xl">
            {passArray.length === 0 ? (
              <p className="text-gray-400 flex items-center justify-center">
                No passwords to show
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border-collapse rounded-lg table-auto shadow-lg">
                  <thead>
                    <tr className="bg-purple-700 text-white">
                      <th className="px-4 py-2 text-cente">Site</th>
                      <th className="px-4 py-2 text-cente">Username</th>
                      <th className="px-4 py-2 text-cente">Password</th>
                      <th className="px-4 py-2 text-cente">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passArray.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition  "
                      >
                        <td className=" text-center py-3">
                          <p className="text-purple-400">
                            <a href={item.url} target="blank">
                              {item.url}
                            </a>
                          </p>
                        </td>
                        <td className=" text-center py-3">
                          <div className="flex items-center justify-center gap-2">
                            {item.username}
                            <div onClick={() => copytext(item.username)}>
                              <img
                                className="w-4 invert"
                                src="/icons/copy-icon.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </td>
                        <td className=" text-center py-3 ">
                          <div className="flex items-center justify-center gap-2">
                            {item.password}
                            <div onClick={() => copytext(item.password)}>
                              <img
                                className="w-4 invert"
                                src="/icons/copy-icon.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </td>
                        <td className=" text-center py-3">
                          <div className="flex gap-3 justify-center">
                            <img
                              onClick={() => handleedit(item.id)}
                              className="w-5 invert"
                              src="/icons/edit-button.svg"
                              alt=""
                            />
                            <img
                              onClick={() => handledelete(item.id)}
                              className="w-5 invert"
                              src="/icons/trash-icon.svg"
                              alt=""
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Manager;
