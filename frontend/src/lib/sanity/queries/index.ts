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

export const pricingSectionQuery = groq`*[_type == "pricingCallout"][0] {
  label,
  heading,
  subheading,
  calloutText,
  calloutPhone,
  tiers[] {
    "_id": _key,
    name,
    description,
    price,
    unit,
    featured,
    features,
    ctaLabel
  }
}`;

export const testimonialsSectionQuery = groq`*[_type == "testimonialsSection"][0] {
  label,
  heading,
  subheading,
  items[] {
    "_id": _key,
    quote,
    name
  }
}`;

export const faqSectionQuery = groq`*[_type == "faqSection"][0] {
  label,
  heading,
  items[] {
    "_id": _key,
    question,
    answer
  }
}`;

export const blogSectionQuery = groq`*[_type == "blogSection"][0] {
  label,
  heading,
  "posts": posts[]-> {
    _id,
    image,
    imageAlt,
    title,
    body,
    slug
  }
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
  logo,
  logoAlt,
  businessName,
  address,
  phone,
  email,
  instagramUrl,
  facebookUrl,
  disclaimer
}`;

export const navSectionQuery = groq`*[_type == "navSection"][0] {
  brandTitle,
  brandSubtitle,
  logo,
  logoAlt,
  items[] { label, href },
  ctaLabel,
  ctaHref
}`;
