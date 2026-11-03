/*
 * All site content lives here. Edit this file to update the portfolio —
 * index.html, main.js and styles.css never need to change for content.
 * Leave a field as "" (or an empty list) to hide it on the page.
 */
window.SITE = {
  profile: {
    name: "Immaculate Chidimma Ogbuagu",
    shortName: "Immaculate C. Ogbuagu",
    // Name variants that are bolded in publication author lists
    authorAliases: ["Ogbuagu I.C.", "Agubata I.C."],
    title: "Software Engineer · Applied AI Researcher",
    roles: [
      { text: "MRes Computing Student", org: "University of Buckingham", url: "https://www.buckingham.ac.uk/" },
      { text: "Lecturer, Software Engineering", org: "Veritas University, Abuja", url: "https://veritas.edu.ng/" }
    ],
    location: "Sheffield, United Kingdom",
    // Square crop of assets/profile.jpeg, centred on the face
    photo: "assets/profile-square.jpg",
    // Optional CV/résumé PDF, e.g. "assets/cv.pdf"
    cv: "",
    links: {
      email: "agubatai@veritas.edu.ng",
      github: "https://github.com/Dimmysophy",
      linkedin: "https://www.linkedin.com/in/immaculate-ogbuagu-824746b3",
      scholar: "",   // Google Scholar profile URL
      orcid: "https://orcid.org/0000-0001-9683-4963",
      researchgate: ""
    }
  },

  hero: {
    eyebrow: "Applied AI for health & food security",
    headline: "Building AI for underserved communities, from",
    rotating: [
      "interpretable ICU risk prediction",
      "high-risk pregnancy prediction",
      "NLP for malaria surveillance",
      "Hausa-language health chatbots",
      "nutrition-risk modelling"
    ],
    // Index into `publications` to feature as "Latest publication"
    featuredPublication: "kama2026systematic"
  },

  about: {
    paragraphs: [
      "I am a software engineer and university lecturer, currently studying for an MRes in Computing at the University of Buckingham, UK, where my research focuses on interpretable machine learning for personalised prediction of serious or fatal ICU outcomes from medication exposure. As a Lecturer in the Department of Software Engineering at Veritas University, Abuja, I teach software engineering, data structures and algorithms, requirements engineering and web development, and lead applied AI research projects.",
      "My work builds AI, machine learning and NLP tools that solve real problems for underserved communities in health and food security: a high-risk pregnancy prediction system, NLP for malaria surveillance, machine learning prediction of nutritional deficiencies, and a Hausa-language AI chatbot built at eHealth Africa. I enjoy teaching, mentoring and helping people get the most out of technology, including through volunteer technical support in Sheffield."
    ],
    interests: [
      "Interpretable machine learning",
      "Clinical risk prediction (ICU)",
      "Applied AI for health",
      "NLP for low-resource languages",
      "Maternal & women's health",
      "Nutrition & food security",
      "Climate-health ML",
      "Software engineering education"
    ]
  },

  // Newest first. `link` is optional.
  news: [
    { date: "Sep 2026", text: "Our systematic review of machine learning approaches for predicting sickle cell crisis and mortality risk at the climate-health nexus is published in BMC Medical Informatics and Decision Making.", link: "https://doi.org/10.1186/s12911-026-03796-4" },
    { date: "2026", text: "Started an MRes in Computing at the University of Buckingham, UK, researching interpretable machine learning for personalised prediction of serious or fatal ICU outcomes from medication exposure.", link: "" },
    { date: "2026", text: "Began volunteering as a Support Buddy at St Mary's Community Centre, Sheffield, providing one-to-one digital support.", link: "" },
    { date: "2024", text: "Won the African Telecommunications Union (ATU) Innovation Challenge, 3rd Edition — sponsored by Intel, Huawei, ITU and GSMA.", link: "" },
    { date: "2024", text: "Presented at the Technology and Innovation Expo 2024, Abuja (Federal Ministry of Innovation, Science and Technology).", link: "" },
    { date: "2023", text: "Presented an IoT-based aquaponics model for local farmers at the OWSD 6th Biennial International Conference, University of Port Harcourt.", link: "" },
    { date: "2022", text: "Named Mentor of the Year at the eHealth Africa Academy.", link: "" }
  ],
  newsVisible: 5,

  // type: "journal" | "conference" | "preprint"; inProgress: true for work in progress.
  // `details` is shown on the page; `volume` / `pages` / `doi` feed the BibTeX entry.
  publications: [
    {
      id: "kama2026systematic",
      title: "Systematic review of machine learning approaches for predicting sickle cell crisis and mortality risk at the climate-health nexus",
      authors: "Kama M.O., Ajah I.A., Ikegwu A.C., Obayi A.A., Uloko F.O., Ogbuagu I.C.",
      venue: "BMC Medical Informatics and Decision Making",
      details: "26:339",
      volume: "26",
      pages: "339",   // article number
      year: 2026,
      type: "journal",
      openAccess: true,
      corresponding: false,
      doi: "10.1186/s12911-026-03796-4",
      code: "",
      summary: "A systematic review of machine learning methods for predicting sickle cell crises and mortality risk, framed around the links between climate and health outcomes."
    },
    {
      id: "ogbuagu-mres-icu",
      title: "Interpretable Machine Learning for Personalised Prediction of Serious or Fatal ICU Outcomes from Medication Exposure",
      authors: "",
      note: "MRes Computing research — University of Buckingham",
      inProgress: true
    },
    {
      id: "agubata2023developing",
      title: "Developing an IoT-Based Aquaponics Model for Local Farmers in Africa",
      authors: "Agubata I.C., et al.",
      venue: "OWSD 6th Biennial International Conference",
      details: "University of Port Harcourt",
      year: 2023,
      type: "conference",
      doi: "",
      code: ""
    }
  ],

  experience: [
    {
      role: "Volunteer Support Buddy",
      org: "St Mary's Community Centre, Bramall Lane, Sheffield",
      dates: "2026 – Present",
      tags: ["Digital Inclusion", "Technical Support", "Community"],
      bullets: [
        "Provide one-to-one technical support to community members, helping them use devices, get online and access digital services.",
        "Help staff and visitors solve practical problems, working out the issue and finding a clear, workable solution.",
        "Support a charity serving disadvantaged residents of Sharrow and surrounding areas, communicating patiently with people of varied backgrounds, ages and levels of digital confidence."
      ]
    },
    {
      role: "Lecturer, Department of Software Engineering",
      org: "Veritas University, Abuja, Nigeria",
      dates: "2022 – Present",
      tags: ["Teaching", "Applied AI Research", "NLP", "Health ML"],
      bullets: [
        "Teach Software Engineering, Data Structures & Algorithms, Requirements Engineering and Web Development to undergraduate students.",
        "Lead applied AI research projects, including a high-risk pregnancy prediction system, NLP for malaria surveillance and machine learning prediction of nutritional deficiencies in vulnerable populations.",
        "Huawei ICT Academy Tutor (2024 – Present); trainer on the Veritas Digital Skills Project, mentoring 12 students (2024)."
      ]
    },
    {
      role: "Software Engineer / Research Assistant",
      org: "eHealth Africa, Nigeria",
      dates: "2021 – 2022",
      tags: ["Women's Health", "Machine Learning", "Conversational AI"],
      bullets: [
        "Built a data-collection module and machine learning analysis (logistic regression, random forest) for a women's health portal.",
        "Developed and evaluated a Hausa-language AI chatbot, measuring accuracy, response time and user satisfaction.",
        "Created an adaptive web platform for collecting data from women in underserved communities."
      ]
    }
  ],

  teaching: {
    courses: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Requirements Engineering",
      "Web Development"
    ],
    roles: [
      { title: "Huawei ICT Academy Tutor", dates: "2024 – Present" },
      { title: "Trainer, Veritas Digital Skills Project — mentored 12 students", dates: "2024" },
      { title: "Mentor of the Year, eHealth Africa Academy", dates: "2022" }
    ]
  },

  education: [
    { degree: "MRes Computing", school: "University of Buckingham, UK", dates: "2026 – Present", notes: ["Research: Interpretable Machine Learning for Personalised Prediction of Serious or Fatal ICU Outcomes from Medication Exposure"] },
    { degree: "MSc Computer Science", school: "University of Nigeria, Nsukka", dates: "2017 – 2019", notes: ["Africom Scholar, EU Intra-Africa Academic Mobility Scheme"] },
    { degree: "BSc Computer Science", school: "University of Nigeria, Nsukka", dates: "2010 – 2014", notes: [] }
  ],

  // `link` and `linkLabel` are optional
  projects: [
    {
      title: "High-Risk Pregnancy Prediction System",
      text: "An applied machine learning system for identifying high-risk pregnancies, led as a research project at Veritas University.",
      tags: ["Maternal health", "ML"],
      link: ""
    },
    {
      title: "NLP for Malaria Surveillance",
      text: "Natural language processing applied to malaria surveillance, turning unstructured health text into usable signals.",
      tags: ["NLP", "BERT", "Public health"],
      link: ""
    },
    {
      title: "Nutritional Deficiency Prediction",
      text: "Machine learning models that predict nutritional deficiencies in vulnerable populations to support targeted intervention.",
      tags: ["Food security", "ML"],
      link: ""
    },
    {
      title: "Hausa-Language AI Chatbot",
      text: "A Hausa-language health chatbot built at eHealth Africa, evaluated on accuracy, response time and user satisfaction.",
      tags: ["Conversational AI", "Low-resource NLP"],
      link: ""
    },
    {
      title: "Women's Health Data Portal",
      text: "An adaptive web platform and data-collection module for women in underserved communities, with logistic regression and random forest analysis.",
      tags: ["Web", "ML", "eHealth"],
      link: ""
    },
    {
      title: "IoT-Based Aquaponics Model",
      text: "An IoT-based aquaponics model designed for local farmers in Africa, presented at the OWSD 6th Biennial International Conference.",
      tags: ["IoT", "Agriculture"],
      link: ""
    }
  ],

  awards: [
    { year: "2024", title: "Winner, African Telecommunications Union (ATU) Innovation Challenge, 3rd Edition", note: "Sponsored by Intel, Huawei, ITU and GSMA" },
    { year: "2024", title: "Presenter, Technology and Innovation Expo 2024, Abuja", note: "Federal Ministry of Innovation, Science and Technology" },
    { year: "2022", title: "Mentor of the Year, eHealth Africa Academy", note: "" },
    { year: "2017–19", title: "Africom Scholar, EU Intra-Africa Academic Mobility Scheme", note: "MSc Computer Science, University of Nigeria, Nsukka" }
  ],

  skills: [
    { group: "AI & Data", items: ["Python", "TensorFlow", "NLP (BERT)", "LSTM", "Random Forest", "Logistic Regression", "SQL", "Tableau"] },
    { group: "Software Development", items: ["Flask", "Django", "Node.js", "React", "RESTful APIs", "Git"] },
    { group: "Professional", items: ["Teaching & Mentoring", "Technical Support", "Problem Solving", "Research", "Stakeholder Collaboration"] },
    { group: "Memberships", items: ["OWSD — Organization for Women in Science for the Developing World", "Nigeria Computer Society"] },
    { group: "Languages", items: ["English (fluent)", "Igbo (intermediate)", "Nigerian Pidgin (intermediate)"] }
  ],

  contact: {
    text: "Interested in collaboration, research or teaching opportunities? I'd love to hear from you."
  }
};
