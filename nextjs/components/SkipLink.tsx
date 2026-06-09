"use client";

// Keyboard skip link — first focusable element on the page.
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        const m = document.getElementById("main-content");
        if (m) m.focus();
      }}
    >
      Skip to main content
    </a>
  );
}

export default SkipLink;
