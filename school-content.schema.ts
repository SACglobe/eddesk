export type SchoolContentV1 = {
  meta: {
    schoolId: string
    schoolName: string
    establishedYear?: number
  }

  branding: {
    logoUrl?: string
    faviconUrl?: string

  }

  contact: {
    address: string
    phone: string
    email: string
    googleMapLink?: string
    hours?: string // Compatibility
    location?: string // Compatibility
  }

  socialLinks?: {
    platform: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin'
    url: string
  }[]

  vision: string
  mission: string
  motto?: string

  visionMission: {
    vision: string
    mission: string
  }

  principal: {
    name: string
    message: string
    photoUrl?: string
    text?: string // Compatibility with template usage
    image?: string // Compatibility with template usage
  }

  activities: {
    academic: { title: string; description: string; image: string }[]
    clubs: { title: string; description: string; image: string }[]
    sports: { title: string; description: string; image: string }[]
    extraCurricular: { title: string; description: string; image: string }[]
    arts: { title: string; description: string; image: string }[]
    leadership: { title: string; description: string; image: string }[]
  }

  infrastructure: {
    name: string
    description: string
    image: string
  }[]

  principalMessage: {
    name: string
    text: string
    image: string
  }

  boardMessage: {
    title: string
    text: string
  }

  gallery: {
    id: string
    imageUrl: string
    caption?: string
  }[]

  highlights: {
    title: string
    description?: string
    iconUrl?: string
    image?: string // Compatibility
    tag?: string   // Compatibility
  }[]

  events: {
    id: string
    title: string
    description: string
    date: string   // ISO or display
    imageUrl?: string
    category?: string // Compatibility
  }[]

  admission: {
    overview: string
    eligibility?: string
    process?: string
    contactNote?: string
    feePaymentUrl?: string // Compatibility
    formFields?: { label: string; type: string; required: boolean }[] // Compatibility
  }

  footer: {
    copyrightText: string
    socialLinks?: {
      platform: 'facebook' | 'instagram' | 'youtube' | 'twitter'
      url: string
    }[]
  }
}
