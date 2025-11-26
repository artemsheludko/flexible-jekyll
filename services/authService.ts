
// Client-side auth using GitHub Personal Access Token (PAT)
// We verify the token against the GitHub API to ensure the user is the owner (Namojo).

const TOKEN_KEY = 'gh_token';
const USER_KEY = 'gh_user';
const ALLOWED_USER = 'namojo'; // Restrict admin access to the repo owner

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
}

export const authService = {
  /**
   * Verifies a GitHub Personal Access Token
   */
  login: async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        return false;
      }

      const user: GitHubUser = await response.json();

      // Check if the authenticated user is the owner
      // Case-insensitive comparison
      if (user.login.toLowerCase() === ALLOWED_USER.toLowerCase()) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;
      } else {
        console.error(`User ${user.login} is not authorized.`);
        return false;
      }
    } catch (error) {
      console.error('Auth failed', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAdmin: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getUser: (): GitHubUser | null => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  }
};
