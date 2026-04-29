import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-base-200">

      <button className="btn btn-primary" onClick={() => toast.success("Working 🎉")}>
        Show Toast
      </button>

      <h1 className="text-3xl font-bold">Hello 👋</h1>

      <div className="card w-80 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">DaisyUI Ready</h2>
          <p>Everything working 🚀</p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
