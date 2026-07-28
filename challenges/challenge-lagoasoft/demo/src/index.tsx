import { useState } from "react";
import { displayedLikes, posts, togglePostVote, type SocialPost } from "./logic";
import "./styles.css";

function BrandMark() {
  return (
    <div className="lago-brand" aria-label="Lagoasoft social">
      <span className="lago-brand__camera" aria-hidden="true">
        <i />
      </span>
      <strong>Lagoa Social</strong>
    </div>
  );
}

function PostArtwork({ type }: { type: SocialPost["artwork"] }) {
  const labels = {
    launch: ["We are hiring", "Build what matters", "🚀"],
    meeting: ["Better together", "Ideas · People · Product", "◌"],
    wellbeing: ["Move. Breathe. Reset.", "Healthy teams do better work", "↗"],
    coding: ["const future = create();", "SHIP / LEARN / REPEAT", "</>"],
    mobile: ["Mobile makers wanted", "Join the crew", "▯"],
  };
  const [title, subtitle, symbol] = labels[type];

  return (
    <div className={`lago-art lago-art--${type}`} role="img" aria-label={title}>
      <span className="lago-art__glow" />
      <div className="lago-art__content">
        <span className="lago-art__symbol">{symbol}</span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      <span className="lago-art__grid" />
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.7-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FeedPost({
  post,
  liked,
  onVote,
}: {
  post: SocialPost;
  liked: boolean;
  onVote: () => void;
}) {
  return (
    <article className="lago-post">
      <header className="lago-post__header">
        <span className="lago-avatar" aria-hidden="true">
          L
        </span>
        <div>
          <strong>{post.nickname}</strong>
          <small>Florianópolis, Brazil</small>
        </div>
        <span className="lago-more" aria-hidden="true">
          •••
        </span>
      </header>

      <PostArtwork type={post.artwork} />

      <div className="lago-post__body">
        <div className="lago-actions">
          <button
            type="button"
            className={liked ? "is-liked" : ""}
            aria-label={liked ? `Unlike ${post.caption}` : `Like ${post.caption}`}
            aria-pressed={liked}
            onClick={onVote}
          >
            <HeartIcon filled={liked} />
          </button>
          <span aria-hidden="true">○</span>
          <span aria-hidden="true">⌁</span>
        </div>
        <p className="lago-likes">
          <strong>{new Intl.NumberFormat("en-GB").format(displayedLikes(post, liked))}</strong>{" "}
          likes
        </p>
        <p className="lago-caption">
          <strong>{post.nickname}</strong> {post.caption}
        </p>
        <time>{post.date}</time>
      </div>
    </article>
  );
}

export default function LagoasoftDemo() {
  const [votes, setVotes] = useState<Record<number, boolean>>({});

  return (
    <section className="lago-demo">
      <header className="lago-nav">
        <BrandMark />
        <div className="lago-nav__icons" aria-hidden="true">
          <span>⌂</span>
          <span>♡</span>
          <span className="lago-avatar lago-avatar--small">L</span>
        </div>
      </header>

      <div className="lago-intro">
        <div>
          <p>React voting challenge · 2019</p>
          <h2>A local social feed with independent likes</h2>
        </div>
        <span>Browser-only state</span>
      </div>

      <div className="lago-feed">
        {posts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            liked={Boolean(votes[post.id])}
            onVote={() => setVotes((current) => togglePostVote(current, post.id))}
          />
        ))}
      </div>
    </section>
  );
}
