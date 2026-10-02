import { useEffect, useState } from 'react';

const REPO = 'daniellawal015-code/daniel-portfolio';
const API_URL = `https://api.github.com/repos/${REPO}/commits?per_page=8`;

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const units = [
    ['y', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60]
  ];
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return 'just now';
}

/**
 * useBuildLog — fetches real commit history for this portfolio's own
 * repo from GitHub's public REST API. No auth, no secrets: the
 * unauthenticated endpoint is rate-limited (60 req/hour per IP) but
 * sufficient for an on-demand panel a visitor opens occasionally.
 *
 * Only fetches once actually requested (`enabled`), not on every app
 * load — this is a command-palette panel, not a homepage widget.
 */
export function useBuildLog(enabled) {
  const [state, setState] = useState({ status: 'idle', commits: [], error: null });

  useEffect(() => {
    if (!enabled || state.status !== 'idle') return;

    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 403 ? 'Rate limited — try again shortly.' : 'Unavailable right now.');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const commits = data.map((c) => ({
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split('\n')[0],
          date: timeAgo(c.commit.author.date)
        }));
        setState({ status: 'ready', commits, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: 'error', commits: [], error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, state.status]);

  return state;
}
