export const siteConfig = {
  name: "Solvior",
  tagline: "Business Consulting",
  email: "support@solvior.com",
  phone: "(000) 123 456 789",
  location: "Santa, United States",
};
export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "Pages",
    href: "#",
    megaMenu: {
      columns: [
        {
          title: "Main Pages",
          items: [
            { label: "About us", href: "/about" },
            { label: "Our history", href: "/history", badge: "HOT" }, // <-- FIXED: # se /history kar diya
            { label: "Team", href: "/team" },
            { label: "Team details", href: "/team/1" },
            { label: "Careers", href: "/careers", badge: "New" },
            { label: "Careers details", href: "/careers/1" },
            { label: "Pricing Plan", href: "/pricing-plan" },
            { label: "Feedbacks", href: "#" },
            { label: "Faq", href: "/faq" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Other pages",
          items: [
            { label: "Services", href: "/services" },
            { label: "Service details", href: "/services/1" },
            { label: "Portfolios", href: "/portfolios" },
            { label: "Portfolio details", href: "/portfolios/1" },
            { label: "Error 404", href: "#" },
            { label: "Blog grid", href: "#", badge: "NEW" },
            { label: "Blog standard", href: "/blogs" },
            { label: "Blog sidebar", href: "/blogs/sidebar" },
            { label: "Blog details", href: "/blogs/1" },
          ],
        },
      ],
    },
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Business process optimization", href: "/services/1" },
      { label: "Strategic planning & execution", href: "/services/2" },
      { label: "Leadership executive coaching", href: "/services/3" },
      { label: "Legacy leadership institute", href: "/services/4" },
      { label: "Executive growth solutions", href: "/services/5" },
      { label: "Empowered leadership journey", href: "/services/6" },
    ],
  },
  {
    label: "Portfolios",
    href: "/portfolios",
    children: [
      { label: "Portfolios", href: "/portfolios" },
      { label: "Portfolio details", href: "/portfolios/1" },
    ],
  },
  {
    label: "Blog",
    href: "/blogs",
    children: [
      { label: "Blog", href: "/blogs" },
      { label: "Blog grid", href: "/blogs/grid" },
      { label: "Blog with sidebar", href: "/blogs/sidebar" },
      { label: "Blog details", href: "/blogs/1" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
export const features = [
  {
    id: "01",
    title: "Quick solutions",
    description:
      "Our consultancy excels in providing quick solutions tailored to your business challenges",
  },
  {
    id: "02",
    title: "Expert advice",
    description:
      "Our consultancy excels in providing quick solutions tailored to your business challenges",
  },
  {
    id: "03",
    title: "Strategic planning",
    description:
      "Our consultancy excels in providing quick solutions tailored to your business challenges",
  },
  {
    id: "04",
    title: "Efficient operations",
    description:
      "Our consultancy excels in providing quick solutions tailored to your business challenges",
  },
];

export const services = [
  {
    id: 1,
    title: "Business process optimization",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-1.webp",
  },
  {
    id: 2,
    title: "Strategic planning & execution",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-2.webp",
  },
  {
    id: 3,
    title: "Leadership executive coaching",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-3.webp",
  },
  {
    id: 4,
    title: "Legacy leadership institute",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-4.webp",
  },
  {
    id: 5,
    title: "Executive growth solutions",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-1.webp",
  },
  {
    id: 6,
    title: "Empowered leadership journey",
    description:
      "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
    image: "/images/service/h1-service-2.webp",
  },
];

export const serviceHighlights = [
  {
    title: "Clear vision and direction for your business for consulting.",
  },
  {
    title: "Enhanced ability to anticipate and respond to market changes.",
  },
  {
    title: "Data-driven decision-making for strategic planning execution.",
  },
  {
    title: "Structured approach to achieving your business goals.",
  },
];

export const serviceFeatures = [
  {
    title: "Quick solutions",
    description: "Provide hands-on guidance and support during the execution of your strategy.",
  },
  {
    title: "Proven results",
    description: "Benefit from the expertise of seasoned consultants who deliver measurable outcomes.",
  },
  {
    title: "Personalization",
    description: "Ensure that strategies are effectively tailored and implemented for your goals.",
  },
];

export const serviceFaqs = [
  {
    question: "How do consultants add value to a business?",
    answer:
      "Consultants bring an objective, outside perspective backed by cross-industry experience, helping you spot inefficiencies, validate strategy and move faster than you could alone.",
  },
  {
    question: "How do I know if my business needs a consultant?",
    answer:
      "If you're facing stagnating growth, operational inefficiencies, or strategic decisions you lack in-house expertise for, a consultant can provide the structured guidance to move forward with confidence.",
  },
  {
    question: "How do business consultants charge for their services?",
    answer:
      "Pricing typically depends on project scope — common models include hourly rates, fixed project fees, or ongoing monthly retainers based on the depth of engagement required.",
  },
  {
    question: "Can a business consultant guarantee results?",
    answer:
      "No reputable consultant guarantees specific outcomes, but a strong track record, clear KPIs and a data-driven approach significantly improve the odds of achieving your goals.",
  },
  {
    question: "How can I measure the success of a consulting engagement?",
    answer:
      "Success is measured against the KPIs agreed at the start of the engagement — typically a mix of financial impact, operational efficiency gains, and progress toward the strategic objectives you defined together.",
  },
];

export const marqueeItems = [
  "Passion and progress",
  "Founders and vision",
  "Growth and impact",
  "Team and values",
  "Innovation and future",
  "Success and impact",
];
export const projects = [
  {
    id: 1,
    number: "01.",
    title: "Innovate consultancy",
    image: "/images/project/h2-project-1.webp",
     secondaryImage: "/images/project/h2-project-2.webp",
    tags: ["Strategy", "Growth"],
      client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
  {
    id: 2,
    number: "02.",
    title: "Strat edge solutions",
    image: "/images/project/h2-project-2.webp",
    secondaryImage: "/images/project/h2-project-3.webp",
    tags: ["Strategy", "Growth"],
     client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
  {
    id: 3,
    number: "03.",
    title: "Prime strategy partners",
    image: "/images/project/h2-project-3.webp",
    secondaryImage: "/images/project/h2-project-4.webp",
    tags: ["Strategy", "Growth"],
     client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
  {
    id: 4,
    number: "04.",
    title: "Elevate enterprise",
    image: "/images/project/h2-project-4.webp",
    secondaryImage: "/images/project/h2-project-1.webp",
    tags: ["Strategy", "Growth"],
     client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
  {
    id: 5,
    number: "05.",
    title: "Empower enterprise",
    image: "/images/project/h1-project-2.webp",
     secondaryImage: "/images/project/h2-project-3.webp",
    tags: ["Strategy", "Growth"],
     client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
  {
    id: 6,
    number: "06.",
    title: "Innovative solutions",
    image: "/images/project/h1-project-4.webp",
    secondaryImage: "/images/project/h2-project-4.webp",
    tags: ["Strategy", "Growth"],
      client: "Albert Buttler",
    portfolioType: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
    description:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
    overview:
      "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation.",
    checklist: [
      "Streamline operations to reduce waste and enhance productivity.",
      "Lower operational costs through automation and optimized processes.",
      "Improve overall business performance with advanced solutions.",
      "Benefit from professional insights throughout the transformation process.",
    ],
    finalResult:
      "Our mission is to empower businesses of every size to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight, innovative approaches, and a consulting practice built around your goals.",
  },
];

export const team = [
  {
    id: 1,
    name: "Savannah Nguyen",
    role: "Manager",
    image: "/images/team/team-1.webp",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Co. Founder",
    image: "/images/team/team-2.webp",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: 3,
    name: "Kristin Watson",
    role: "Sr. Manager",
    image: "/images/team/team-3.webp",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: 4,
    name: "Guy Hawkins",
    role: "Sr. Marketer",
    image: "/images/team/team-4.webp",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },
];

export const testimonialMainImage = "/images/testimonial/h2-test-1.webp"; // apki main image ka path

export const testimonials = [
  {
    id: 1,
    quote: "Partnering with Solvior has been a transformative experience for our organization. Their expert guidance through our market expansion strategy was invaluable, helping us navigate complex regulatory environments.",
    author: "Natalie Harry",
    role: "Sr. Executive",
    avatar: "/images/testimonial/h1-test-2.webp", // chhota circle wala avatar
  },
  {
    id: 2,
    quote: "The team at Solvior brought clarity to a process that once felt overwhelming. Their strategic roadmap gave our leadership the confidence to make bold, informed decisions.",
    author: "Burdee Nicolas",
    role: "Business owner",
    avatar: "/images/testimonial/h3-test-1.webp",
  },
];

export const blogPosts = [
  {
    "id": 1,
    "date": "28",
    "month": "JUL",
    "category": "Branding",
    "comments": "02",
    "title": "Innovative solutions for business success dynamic",
    "excerpt": "In today's dynamic business environment, the key to success lies in strategic planning and operational execution organisations.",
    "image": "/images/blog/h2-blog-1.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "28 Jul,2025",
    "tags": [
      "Branding",
      "Design"
    ],
    "quote": "The greatest asset of a consultant is the ability to ask the right questions and guide clients to discover their own consulting answers.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Kye lessons of business",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 2,
    "date": "06",
    "month": "NOV",
    "category": "Business",
    "comments": "03",
    "title": "What consultants should know about working with nonprofits",
    "excerpt": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace, delivering exceptional value.",
    "image": "/images/blog/h2-blog-2.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "06 Nov,2025",
    "tags": [
      "Business",
      "Marketing"
    ],
    "quote": "Nonprofits don't need more advice, they need partners who understand their mission as deeply as their numbers.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Working with purpose driven teams",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 3,
    "date": "24",
    "month": "AUG",
    "category": "Consulting",
    "comments": "01",
    "title": "Why every entrepreneur needs solid digital marketing",
    "excerpt": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to delivering value.",
    "image": "/images/blog/h2-blog-3.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "24 Aug,2025",
    "tags": [
      "Consulting",
      "Branding"
    ],
    "quote": "Digital marketing is not an expense, it is an investment in a consultancy's most valuable asset — client trust.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Building an online presence",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 4,
    "date": "01",
    "month": "NOV",
    "category": "Innovations",
    "comments": "02",
    "title": "Mastering change management key lessons for businesses",
    "excerpt": "Strategic insight and innovative approaches empower businesses of all sizes to deliver lasting, measurable operational results.",
    "image": "/images/blog/h2-blog-1.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "01 Nov,2025",
    "tags": [
      "Innovations",
      "Business"
    ],
    "quote": "Change management succeeds when leadership listens as much as it directs.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Kye lessons of change",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 5,
    "date": "12",
    "month": "SEP",
    "category": "Managements",
    "comments": "04",
    "title": "Building resilient teams for long term growth",
    "excerpt": "A resilient team culture is the backbone of sustainable growth, helping organisations adapt quickly to changing market demands.",
    "image": "/images/blog/h2-blog-2.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "12 Sep,2025",
    "tags": [
      "Managements",
      "Business"
    ],
    "quote": "Resilient teams are not built during a crisis, they are built long before one arrives.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "What makes a team resilient",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 6,
    "date": "05",
    "month": "OCT",
    "category": "Marketing",
    "comments": "02",
    "title": "How data driven insights shape modern strategy",
    "excerpt": "Leveraging analytics and market data helps consultants craft precise strategies that respond to real business challenges.",
    "image": "/images/blog/h2-blog-3.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "05 Oct,2025",
    "tags": [
      "Marketing",
      "Consulting"
    ],
    "quote": "Data without a strategic question behind it is just noise, not insight.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Turning data into direction",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 7,
    "date": "18",
    "month": "JUN",
    "category": "Branding",
    "comments": "01",
    "title": "The future of leadership executive coaching",
    "excerpt": "Executive coaching continues to evolve, giving leaders the tools they need to navigate uncertainty with clarity and confidence.",
    "image": "/images/blog/h2-blog-1.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "18 Jun,2025",
    "tags": [
      "Branding",
      "Design"
    ],
    "quote": "Great coaching does not hand leaders answers, it sharpens the questions they ask themselves.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "The coaching mindset shift",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 8,
    "date": "09",
    "month": "MAY",
    "category": "Business",
    "comments": "03",
    "title": "Five operational habits of high performing consultancies",
    "excerpt": "Consistent process, clear communication and disciplined execution separate high performing consultancies from the rest.",
    "image": "/images/blog/h2-blog-2.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "09 May,2025",
    "tags": [
      "Business",
      "Marketing"
    ],
    "quote": "Operational discipline is the quiet advantage that separates good consultancies from great ones.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Operational habits that scale",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  },
  {
    "id": 9,
    "date": "22",
    "month": "MAR",
    "category": "Consulting",
    "comments": "02",
    "title": "Why every entrepreneur needs solid digital marketing",
    "excerpt": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace through digital transformation.",
    "image": "/images/blog/h2-blog-3.webp",
    "author": "Burdee Nicolas",
    "authorAvatar": "/images/testimonial/h3-test-1.webp",
    "dateReleased": "22 Mar,2025",
    "tags": [
      "Consulting",
      "Branding"
    ],
    "quote": "A brand that markets with consistency earns trust long before it earns a sale.",
    "quoteAuthor": "Aryan Greene",
    "afterQuote": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional",
    "subheading": "Consistency across every channel",
    "subheadingText": "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset",
    "checklist": [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    "secondaryImage": "/images/project/pheader-bg.webp",
    "conclusion": [
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.",
      "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset."
    ]
  }
];

export const blogCategories = [
  {
    "name": "Branding",
    "count": 2
  },
  {
    "name": "Business",
    "count": 2
  },
  {
    "name": "Consuting",
    "count": 2
  },
  {
    "name": "Innovations",
    "count": 1
  },
  {
    "name": "Managements",
    "count": 1
  },
  {
    "name": "Marketing",
    "count": 1
  }
];

export const blogTags = [
  "Branding",
  "Business",
  "Design",
  "Marketing",
  "Strategy"
];

export const blogComments = [
  {
    "id": 1,
    "name": "Jami Simth",
    "avatar": "/images/team/team-1.webp",
    "date": "February 03, 2024",
    "text": "Our mission is to empowers businesses size to thrive in an businesses ever changes marketplace. We are committed to the delivering exceptionals the value through strategic inset.Our mission is to empowers businesses size to thrive in an businesses",
    "replies": [
      {
        "id": 2,
        "name": "Marden Smith",
        "avatar": "/images/team/team-2.webp",
        "date": "March 12, 2024",
        "text": "Our mission is to empowers businesses size to thrive in an businesses ever changes marketplace. We are committed to the delivering exceptionals the value through strategic inset.Our mission is to empowers businesses size to thrive in an businesses"
      }
    ]
  },
  {
    "id": 3,
    "name": "Mahin Deen",
    "avatar": "/images/team/team-3.webp",
    "date": "June 22, 2024",
    "text": "Our mission is to empowers businesses size to thrive in an businesses ever changes marketplace. We are committed to the delivering exceptionals the value through strategic inset.Our mission is to empowers businesses size to thrive in an businesses",
    "replies": []
  }
];