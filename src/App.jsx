
function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-9xl font-bold">Rahul Patil</h1>
          <h1 className="text-5xl text-red-500">🚀 Tailwind is working!</h1>
          <nav className="space-x-4">
            <a href="#home" className="hover:text-blue-600 font-medium">Home</a>
            <a href="#skills" className="hover:text-blue-600 font-medium">Skills</a>
            <a href="#projects" className="hover:text-blue-600 font-medium">Projects</a>
            <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section id="home" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Welcome to My DevOps Portfolio</h2>
          <p className="text-lg">
            I'm Rahul, a DevOps enthusiast with experience in Docker, Jenkins, and Linux. This site showcases my journey and projects.
          </p>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">Docker</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">Jenkins</span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">Git & GitHub</span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full">Linux</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">AWS</span>
          </div>
        </section>

        <section id="projects" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <p className="text-lg">This section will list your GitHub projects dynamically soon.</p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>Email: <a href="mailto:rahul@example.com" className="text-blue-600">rahul@example.com</a></p>
          <p>GitHub: <a href="https://github.com/YOUR_USERNAME" className="text-blue-600" target="_blank" rel="noopener noreferrer">github.com/YOUR_USERNAME</a></p>
        </section>
      </main>

      <footer className="bg-white border-t mt-10 py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Rahul Patil. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
