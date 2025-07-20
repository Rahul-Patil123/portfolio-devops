const GITHUB_USERNAME = "Rahul-Patil123";
const GITHUB_TOPICS = ["portfolio", "devops"];

// Helper: Fetch image from README (first image markdown)
async function fetchReadmeImage(repoName) {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" },
    });
    const readme = await res.text();

    // Extract first image markdown: ![alt](url)
    const match = readme.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  } catch (err) {
    console.error(`Error fetching README for ${repoName}`, err);
    return null;
  }
}

export async function fetchFilteredRepos() {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
  const repos = await response.json();

  if (!Array.isArray(repos)) return [];

  const filteredRepos = repos.filter((repo) => {
    const descMatch = GITHUB_TOPICS.some((keyword) =>
      (repo.description || "").toLowerCase().includes(keyword.toLowerCase())
    );
    const topicMatch = (repo.topics || []).some((topic) =>
      GITHUB_TOPICS.includes(topic.toLowerCase())
    );
    return descMatch || topicMatch;
  });
  const enrichedRepos = await Promise.all(
    filteredRepos.map(async (repo) => {
      const image = await fetchReadmeImage(repo.name);
      return {
        title: repo.name,
        description: repo.description || "No description",
        url: repo.html_url,
        image,
      };
    })
  );

  return enrichedRepos;
}
