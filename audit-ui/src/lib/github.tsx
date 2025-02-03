export const transformGitHubUrlToApiUrl = (githubUrl: string) => {
  if (!githubUrl.trim()) {
    throw new Error("Invalid GitHub URL");
  }

  const url = new URL(githubUrl);
  const pathParts = url.pathname.split("/").filter(Boolean);

  const owner = pathParts[0];
  const repo = pathParts[1];

  // Check if the URL is for a file or a repository
  if (pathParts[2] === "blob") {
    // File URL: https://github.com/{owner}/{repo}/blob/{branch}/{path}
    const branch = pathParts[3];
    const filePath = pathParts.slice(4).join("/");
    return `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  } else {
    throw new Error("Invalid GitHub URL");
  }
};

export async function fetchUrl(url: string): Promise<string> {
  if (!url.trim()) {
    throw new Error("Invalid URL");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch URL contents");
  }

  const text = await response.json();

  if (!text?.content) {
    throw new Error("Empty content returned");
  }

  // Decode base64 content
  const content = atob(text.content);

  return content;
}
