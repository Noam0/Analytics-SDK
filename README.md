<h1 align="center">Analytics SDK Backend</h1>

<p align="center">
  This project is a backend for an <strong>Analytics SDK</strong> designed to provide developers with analytics for their applications. The backend is built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>PostgreSQL</strong>, offering features like user management, log tracking, and application analytics.
</p>

---

<h2>🚀 Features</h2>

<ul>
  <li><strong>Developers Management:</strong>
    <ul>
      <li>Register new developers.</li>
      <li>Manage API keys and authentication.</li>
    </ul>
  </li>
  <li><strong>Applications Management:</strong>
    <ul>
      <li>Link applications to developers.</li>
      <li>Retrieve and manage application data.</li>
    </ul>
  </li>
  <li><strong>User Analytics:</strong>
    <ul>
      <li>Track total users.</li>
      <li>Daily logins and retention rates.</li>
      <li>Count specific button clicks within the application.</li>
      <li>Time spent on the app.</li>
    </ul>
  </li>
  <li><strong>Logs Management:</strong>
    <ul>
      <li>Record and retrieve logs (e.g., crashes, errors, daily logins).</li>
      <li>Log types include geographical analytics and user feedback.</li>
    </ul>
  </li>
</ul>

---

<h2>🛠 Technologies Used</h2>

<ul>
  <li><strong>Backend:</strong> Node.js with Express.js</li>
  <li><strong>Database:</strong> PostgreSQL</li>
  <li><strong>API Documentation:</strong> Swagger (via <code>swagger-ui-express</code>)</li>
  <li><strong>Authentication:</strong> API key-based authentication for developers</li>
  <li><strong>Version Control:</strong> Git</li>
</ul>

---

<h2>📦 Getting Started</h2>

<h3>🔧 Prerequisites</h3>

<ul>
  <li><strong>Node.js</strong> (v14+ recommended)</li>
  <li><strong>PostgreSQL</strong> (v12+ recommended)</li>
  <li><strong>Git</strong></li>
</ul>

<h3>🚀 Installation</h3>

<pre><code># Clone the repository
git clone https://github.com/your-username/analytics-sdk-backend.git

# Navigate into the project directory
cd analytics-sdk-backend

# Install dependencies
npm install
</code></pre>

<h3>⚙️ Environment Variables</h3>

<p>Create a <code>.env</code> file in the root directory and add the following:</p>

<pre><code>PORT=5000
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=analytics_sdk
</code></pre>

---

<h2>🐳 Running with Docker</h2>

<p>To run the backend with PostgreSQL in Docker:</p>

<pre><code># Start the containers
docker-compose up -d

# Check logs if needed
docker logs analytics_backend
</code></pre>

---

<h2>📝 API Documentation</h2>

<p>API documentation is available via Swagger:</p>

<pre><code>http://localhost:5000/api-docs</code></pre>

---

<h2>📊 Database Management</h2>

<h3>🔍 Check Existing Tables</h3>

<pre><code>docker exec -it my_postgres psql -U postgres -d analytics_sdk -c "\dt"
</code></pre>

<h3>📌 Running Migrations</h3>

<p>To apply the schema to the database:</p>

<pre><code>docker exec -it my_postgres psql -U postgres -d analytics_sdk -f /schema.sql
</code></pre>

---

<h2>🚀 Running the Backend</h2>

<p>Once everything is set up, run the backend server:</p>

<pre><code># Start the backend
npm start
</code></pre>

<p>For development mode with automatic reload:</p>

<pre><code>npm run dev
</code></pre>

---

<h2>🛠 Troubleshooting</h2>

<ul>
  <li><strong>Database connection issues:</strong> Ensure PostgreSQL is running with <code>docker ps</code>.</li>
  <li><strong>Swagger not working:</strong> Restart the backend and check if <code>http://localhost:5000/api-docs</code> loads.</li>
  <li><strong>Docker container not starting:</strong> Run <code>docker-compose logs</code> to diagnose errors.</li>
</ul>

---

<h2>🤝 Contribution</h2>

<p>Want to improve this project? Fork it, make your changes, and submit a pull request!</p>

<pre><code># Fork the repo
git fork https://github.com/your-username/analytics-sdk-backend.git

# Create a new branch
git checkout -b feature-new-feature

# Commit changes
git commit -m "Added a new feature"

# Push to GitHub
git push origin feature-new-feature

# Create a pull request
</code></pre>

---

<h2>📄 License</h2>

<p>This project is licensed under the MIT License.</p>

---

<p align="center">Made with ❤️ by the Analytics SDK Team</p>
