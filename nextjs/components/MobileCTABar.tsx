import { Button } from "./Button";

// Sticky bottom action bar shown only on small screens (CSS-gated).
export function MobileCTABar() {
  return (
    <div className="mobile-cta-bar">
      <Button to="/vacancies" variant="primary" icon="arrowRight" style={{ flex: 1, justifyContent: "center" }}>Find Jobs</Button>
      <Button to="/employers" variant="outline" iconLeft="building" style={{ flex: 1, justifyContent: "center" }}>Hire Staff</Button>
    </div>
  );
}

export default MobileCTABar;
