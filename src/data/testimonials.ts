export interface Testimonial {
  /** Name exactly as the person agreed to have it shown. */
  name: string;
  /** What they actually said, in their own words. */
  quote: string;
}

/**
 * Real customer feedback only: each entry must come from a person who said it
 * and agreed to have it published. The Testimonials section renders nothing
 * while this list is empty, and appears automatically once entries are added.
 */
export const testimonials: Testimonial[] = [];
