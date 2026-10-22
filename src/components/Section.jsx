// Section wrapper: semantic <section> with an id for anchor nav + scroll-spy.
// Content renders immediately (no lazy placeholder) so the document height is
// stable and anchored navigation / scroll-spy stay accurate. Entrance motion
// is handled per-element by the Reveal / GSAP layers instead.
export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
