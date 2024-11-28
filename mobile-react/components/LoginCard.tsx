import { useState } from "react";

export default function LoginForm() {
  const [userType, setUserType] = useState<"aluno" | "professor">("aluno");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ userType, email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-purple-200 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">LOGIN</h2>

      <div className="flex justify-around mb-6">
        <label className="flex items-center text-purple-800">
          <input
            type="radio"
            name="userType"
            value="aluno"
            checked={userType === "aluno"}
            onChange={() => setUserType("aluno")}
            className="mr-2 text-purple-600"
          />
          aluno
        </label>
        <label className="flex items-center text-purple-800">
          <input
            type="radio"
            name="userType"
            value="professor"
            checked={userType === "professor"}
            onChange={() => setUserType("professor")}
            className="mr-2 text-purple-600"
          />
          professor
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-purple-800 font-bold mb-2" htmlFor="email">
          username
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-purple-800 font-bold mb-2" htmlFor="password">
          password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-4 py-2 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Login
      </button>
    </div>
  );
};