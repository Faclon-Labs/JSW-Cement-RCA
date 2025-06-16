module.exports = {
    apps: [
      {
        name: 'jsw-rca',          // e.g., repoId or anything unique
        script: 'npm', // Start the Next.js server
        args: 'start',                  // 'start' for production server
        cwd: '/home/ubuntu/JSW-Cement-RCA/fe',   // Replace with fullRepoPath
        env: {
          NODE_ENV: 'production',
          PORT: 5000                   // Replace with dynamicPort if using programmatically
        }
      }
    ]
  };
  