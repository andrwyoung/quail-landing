export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-background text-text font-body">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-header text-5xl md:text-6xl text-primary mb-6">
          Welcome to Quail
        </h1>
        <p className="text-lg md:text-xl  max-w-2xl mb-8">
          Build modern, elegant web experiences faster with our tools and
          expertise.
        </p>
        <div className="flex gap-4">
          <a
            href="#get-started"
            className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-hover transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-6 py-3 border border-border text-text rounded-lg hover:bg-secondary-bg transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto py-24 px-6"
      >
        <div className="p-6 rounded-lg bg-secondary-bg">
          <h3 className="font-header text-xl mb-2 text-text-light">Fast</h3>
          <p className="text-text-light">
            Optimized for speed with modern tooling and minimal overhead.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-secondary-bg">
          <h3 className="font-header text-xl mb-2 text-primary">Flexible</h3>
          <p className="text-text-light">
            Tailor the design system to your brand with ease.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-secondary-bg">
          <h3 className="font-header text-xl mb-2 text-primary">Beautiful</h3>
          <p className="text-text-light">
            Clean typography and accessible color choices out of the box.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="bg-primary rounded-lg text-background text-center py-20 px-6"
      >
        <h2 className="font-header text-3xl md:text-4xl mb-4">
          Ready to start?
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of developers building with Quail today.
        </p>
        <a
          href="#get-started"
          className="px-8 py-3 bg-background text-primary font-semibold rounded-lg hover:bg-text-inverse hover:text-background transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}
