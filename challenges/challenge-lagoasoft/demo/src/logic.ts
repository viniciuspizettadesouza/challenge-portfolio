export interface SocialPost {
  id: number;
  nickname: string;
  caption: string;
  likes: number;
  date: string;
  artwork: "launch" | "meeting" | "wellbeing" | "coding" | "mobile";
}

export const posts: SocialPost[] = [
  {
    id: 1,
    nickname: "lagoasoft",
    caption: "Need a job? 🚀",
    likes: 900,
    date: "11 December 2018",
    artwork: "launch",
  },
  {
    id: 2,
    nickname: "lagoasoft",
    caption: "Team meeting 📷",
    likes: 50_000,
    date: "30 November 2018",
    artwork: "meeting",
  },
  {
    id: 3,
    nickname: "lagoasoft",
    caption: "Time to stretch 😜",
    likes: 50,
    date: "27 November 2018",
    artwork: "wellbeing",
  },
  {
    id: 4,
    nickname: "lagoasoft",
    caption: "Coding 💪👊",
    likes: 500,
    date: "27 November 2018",
    artwork: "coding",
  },
  {
    id: 5,
    nickname: "lagoasoft",
    caption: "Mobile developer role 🚀",
    likes: 150,
    date: "27 November 2018",
    artwork: "mobile",
  },
];

export function displayedLikes(post: SocialPost, liked: boolean) {
  return post.likes + (liked ? 1 : 0);
}

export function togglePostVote(votes: Record<number, boolean>, postId: number) {
  return { ...votes, [postId]: !votes[postId] };
}
