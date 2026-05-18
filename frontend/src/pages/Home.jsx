import Navbar from "../components/Navbar";
import axios from "axios";

const testBackend = async() => {
    const response = await axios.get(
        "http://localhost:5000"
    );
    console.log(response.data); 
}
<button onClick={testBackend} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
    Test Backend
</button>
function Home(){
    return (
        <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className ="flex flex-col items-center justify-center mt-32">
        <h1 className= "text-5xl font-bold mb-6">
            Crack Interview with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
            Upload your resume, practice AI-generated interview questions, and get smart feedback instantly.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Start Interview
        </button>
        </div>
        </div>
    );
}
export default Home;