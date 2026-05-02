import { groq } from 'next-sanity';

export const heroSectionQuery = groq`*[_type == "heroSection"][0] {
  pill,
  headline,
  subheading,
  ctaLabel,
  heroImage,
  overlayHeadline,
  overlayBody
}`;

export const servicesSectionQuery = groq`*[_type == "servicesSection"][0] {
  label,
  heading,
  subheading,
  cards[] { title, body }
}`;

export const conditionsSectionQuery = groq`*[_type == "conditionsSection"][0] {
  heading,
  conditions,
  disclaimer
}`;

export const providerSectionQuery = groq`*[_type == "providerSection"][0] {
  label,
  heading,
  body,
  quote,
  portrait
}`;

export const processSectionQuery = groq`*[_type == "processSection"][0] {
  label,
  heading,
  steps[] { num, title, body }
}`;

export const clinicSectionQuery = groq`*[_type == "clinicSection"][0] {
  headline,
  body,
  address,
  mapsUrl,
  chips,
  photo1,
  photo2
}`;

export const pricingCalloutQuery = groq`*[_type == "pricingCallout"][0] {
  label,
  heading,
  subheading,
  calloutText,
  calloutPhone
}`;

export const pricingTiersQuery = groq`*[_type == "pricingTier"] | order(order asc) {
  _id,
  name,
  description,
  price,
  unit,
  featured,
  features,
  ctaLabel
}`;

export const testimonialsSectionQuery = groq`*[_type == "testimonialsSection"][0] {
  label,
  heading,
  subheading
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  name
}`;

export const faqSectionQuery = groq`*[_type == "faqSection"][0] {
  label,
  heading
}`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`;

export const blogSectionQuery = groq`*[_type == "blogSection"][0] {
  label,
  heading
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(order asc) {
  _id,
  image,
  imageAlt,
  title,
  body,
  slug
}`;

export const glimpsesSectionQuery = groq`*[_type == "glimpsesSection"][0] {
  label,
  heading,
  subheading,
  instagramHandle,
  instagramUrl,
  row1Images,
  row2Images
}`;

export const footerSectionQuery = groq`*[_type == "footerSection"][0] {
  businessName,
  address,
  phone,
  email,
  instagramUrl,
  facebookUrl,
  disclaimer
}`;
