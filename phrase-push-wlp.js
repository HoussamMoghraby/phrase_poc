const { execSync } = require('child_process');

try {
  // Get current Git branch name
  const branch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

  console.log(`🚀 Detected Git branch: ${branch}`);
  console.log(`📤 Pushing strings to Phrase branch: ${branch}`);

  // Set PHRASE_BRANCH and run phrase push
  execSync(`phrase push --config .phrase-wlp.yml --branch ${branch}`, {
    stdio: 'inherit',
    shell: true
  });
  
} catch (err) {
  console.error('❌ Failed to push to Phrase:', err.message);
  process.exit(1);
}
