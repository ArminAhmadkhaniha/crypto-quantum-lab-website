import { useState } from 'react'

function App() {
  // STATE: These variables hold the data the user types
  const [formData, setFormData] = useState({
    name: "",
    github_link: "",
    description: ""
  })
  
  const [status, setStatus] = useState("idle") // idle, submitting, success, error

  // HANDLER: Updates state when user types in a box
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // SUBMIT: The function that talks to your Go Backend
  const handleSubmit = async (e) => {
    e.preventDefault() // Stop page from reloading
    setStatus("submitting")

    try {
      // 1. Send Data to Go Server (Port 8080)
      const response = await fetch("http://localhost:8080/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      // 2. Check Result
      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", github_link: "", description: "" }) // Clear form
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  // THE UI 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit</h2>
        <p className="text-gray-500 mb-6">Send your information to the Crypto-Quantum Lab.</p>

        {status === "success" ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            <p className="font-bold">✅ Received!</p>
            <p className="text-sm">Our backend is processing your submission.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-4 text-blue-600 underline text-sm"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NAME INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Researcher Name</label>
              <input 
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-black"
                placeholder="Armin Ahmadkhaniha"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* GITHUB LINK INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
              <input 
                name="github_link"
                type="url"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-black"
                placeholder="https://github.com/..."
                value={formData.github_link}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                name="description"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-black"
                placeholder="Brief summary of your related background..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {status === "submitting" ? "Sending..." : "Submit to Lab"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center">Connection Failed. Is Go running?</p>
            )}

          </form>
        )}
      </div>
    </div>
  )
}

export default App