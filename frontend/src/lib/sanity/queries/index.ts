import { groq } from 'next-sanity';

export const heroSectionQuery = groq`*[_type == "heroSection"][0] {
  headline,
  subheading,
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
    priceTiers[] { label, amount },
    featured,
    features
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
  cardCtaLabel,
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
  heading,
  subheading,
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

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  heroHeadline,
  heroSubheading,
  heroImage,
  heroImageCaption,
  christaName,
  christaBio,
  christaCredentials,
  christaPortrait,
  teamHeading,
  teamMembers[] {
    role,
    name,
    bio,
    portrait,
    gradient,
    placeholderNote
  },
  kapHeading,
  kapPartnerName,
  kapBody,
  kapLinkLabel,
  kapLinkHref,
  kapPortrait,
  locationHeadline,
  locationBody,
  locationPrimaryCtaLabel,
  locationPrimaryCtaHref,
  locationSecondaryCtaLabel,
  locationSecondaryCtaHref,
  locationPhoto
}`;

export const treatmentsPageQuery = groq`*[_type == "treatmentsPage"][0] {
  heroTitle,
  heroSub,
  heroImage,
  introBody,
  "treatments": treatments[]-> {
    _id,
    title,
    "slug": slug.current,
    cardDescription,
    cardIcon,
    cardGradient,
    cardPhoto,
    draft
  },
  ctaText,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref
}`;

export const bookPageQuery = groq`*[_type == "bookPage"][0] {
  eyebrow,
  headlineDefault,
  headlineReturning,
  subheadingDefault,
  subheadingReturning,
  tabNew { label, h2, sub, bullets, ctaLabel },
  tabClinic { label, h2, sub, bullets, ctaLabel },
  tabAthome { label, h2, sub, bullets, ctaLabel },
  footerNote
}`;

export const bookThanksPageQuery = groq`*[_type == "bookThanksPage"][0] {
  flowNew {
    heading,
    subheading,
    eyebrow,
    deposit { label, amount, description, lookupKey }
  },
  flowReturning {
    heading,
    subheading,
    eyebrow,
    pickerLabel,
    prices[] { label, amount, description, lookupKey }
  },
  flowAthome {
    heading,
    subheading,
    eyebrow,
    pickerLabel,
    prices[] { label, amount, description, lookupKey }
  },
  newDepositCtaLabel,
  newDepositLoadingLabel,
  otherCtaLabel,
  secureNote,
  errorMessage,
  backLinkLabel
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  heading,
  intro
}`;

export const bookSuccessPageQuery = groq`*[_type == "bookSuccessPage"][0] {
  heading,
  body,
  contactCardText,
  contactPhone,
  contactPhoneTel,
  backLinkLabel,
  fallbackHeading,
  fallbackBody
}`;

export const blogIndexPageQuery = groq`*[_type == "blogIndexPage"][0] {
  heroEyebrow,
  heroHeadline,
  heroSubheading,
  heroImage,
  heroImageCaption,
  heroImageAlt,
  featuredEyebrow,
  featuredCtaLabel,
  gridHeadingWithFeatured,
  gridHeadingNoFeatured,
  noteCountSingular,
  noteCountPlural,
  cardCtaLabel,
  emptyHeadline,
  emptyBody,
  metaTitle,
  metaDescription,
  "featuredPost": featuredPost-> {
    _id,
    title,
    "slug": slug.current,
    image,
    imageAlt,
    body,
    author,
    publishDate,
    readMinutes
  }
}`;

export const blogPostPageQuery = groq`*[_type == "blogPostPage"][0] {
  eyebrowLabel,
  readMinutesSuffix,
  backLinkLabel,
  backLinkHref,
  placeholderBody,
  placeholderLinkLabel,
  metaTitleSuffix,
  metaTitleSeparator,
  fallbackMetaTitle
}`;

export const allBlogPostsQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishDate desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  imageAlt,
  body,
  author,
  publishDate,
  readMinutes
}`;

export const allBlogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  image,
  imageAlt,
  body,
  fullBody,
  author,
  publishDate,
  readMinutes,
  metaTitle,
  metaDescription
}`;

export const allTreatmentSlugsQuery = groq`*[_type == "treatment" && defined(slug.current)][].slug.current`;

export const treatmentBySlugQuery = groq`*[_type == "treatment" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  draft,
  metaDescription,
  heroSub,
  heroImage,
  stats[] { value, label },
  protocolAsideTitle,
  protocolBody,
  treatList[] { label, offlabel },
  referList,
  qualifyLinkLabel,
  qualifyLinkHref,
  pricingMain,
  pricingNote,
  steps[] { num, title, body },
  related[] {
    tag,
    bodyOverride,
    "service": service-> {
      _id,
      title,
      "slug": slug.current,
      cardDescription
    }
  }
}`;
