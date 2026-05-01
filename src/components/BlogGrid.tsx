const posts = [
  {
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop",
    alt: "Sunlight through pine trees",
    title: "Light through trees",
    body: "A quiet walk through morning light. The forest breathing with you - slow, soft, alive.",
    href: "#blog-1",
  },
  {
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop",
    alt: "Hands giving a healing touch",
    title: "Hands and presence",
    body: "Inside a session: soft touch, and the safety to feel what's ready to unfold.",
    href: "#blog-2",
  },
  {
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop",
    alt: "Forest at twilight",
    title: "Night in the Wild",
    body: "How the forest shifts at night and what it teaches us about stillness.",
    href: "#blog-3",
  },
];

export default function BlogGrid() {
  return (
    <section className="section" data-screen-label="12 Blog">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">Our Blog</span>
          <h2 className="section-title">Forest Stories</h2>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.href}>
              <div className="blog-card-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.img} alt={post.alt} loading="lazy" />
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-body">{post.body}</p>
              <a className="blog-card-read" href={post.href}>
                Read
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
