import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="ink-deep grid-tex" style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "80px 20px", textAlign: "center" }}>
      <div className="on-dark" style={{ maxWidth: 480 }}>
        <span className="eyebrow on-dark" style={{ justifyContent: "center" }}><Icon name="compass" size={14} /> 404</span>
        <h1 className="h1" style={{ color: "#fff", margin: "16px 0 0" }}>Page not found</h1>
        <p className="lead" style={{ margin: "16px 0 28px" }}>
          We couldn&apos;t find that page. Try the vacancy snapshot, or head back home.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button to="/" variant="light" icon="arrowRight">Back home</Button>
          <Button to="/vacancies" variant="ghost">Browse jobs</Button>
        </div>
      </div>
    </section>
  );
}
