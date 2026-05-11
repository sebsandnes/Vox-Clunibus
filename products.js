const PRODUCTS = [
  {
    id: "prod_001",
    name: "It's Not a Chair, It's a Throne",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "🪑",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffad82eb276.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008e6220ec0.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008e622110c.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008e6221352.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008e6220a44.png"
    ],
    description: "You sit differently when you know the truth. This isn't furniture — it's a statement of power. Wear it. Own it. Never explain it.",
    variants: {
      Black: {
        S: "69ff0e5577d792", M: "69ff0e5577d831", L: "69ff0e5577d8c1",
        XL: "69ff0e5577d9b4", "2XL": "69ff0e5577da46", "3XL": "69ff0e5577dac3"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_002",
    name: "Born to Rot, Forced to Work",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "💀",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffae86211c1.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008eff6f6f3.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008eff6f924.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008eff6fb2d.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008eff6f2e1.png"
    ],
    description: "You didn't choose this life. This life chose you, handed you an alarm clock, and said 'good luck'. At least your shirt gets it.",
    variants: {
      Black: {
        S: "69ff0c10993dd4", M: "69ff0c10993e33", L: "69ff0c10993e99",
        XL: "69ff0c10993ee7", "2XL": "69ff0c10993f78", "3XL": "69ff0c10993fb4"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_003",
    name: "Mentally in a Recliner",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "🛋️",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffad4fcf922.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008e890420a.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008e8904474.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008e89046ed.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008e8903d78.png"
    ],
    description: "Body: present. Mind: fully reclined, snacks nearby, do not disturb. For everyone who shows up but refuses to mentally commit.",
    variants: {
      Black: {
        S: "69ff0d55e9b126", M: "69ff0d55e9b185", L: "69ff0d55e9b1d2",
        XL: "69ff0d55e9b221", "2XL": "69ff0d55e9b262", "3XL": "69ff0d55e9b2a4"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_004",
    name: "I Support LGBTQ",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "🌈",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffacd6ece9e.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008edea0bbc.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008edea10e9.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008edea169f.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008edea0447.png"
    ],
    description: "Lips. Giant-Ass. Boobs. Toes. Quickie. You thought it was something else, didn't you? Wear it and watch people do a double take.",
    variants: {
      Black: {
        S: "69ff0c91846035", M: "69ff0c91846098", L: "69ff0c918460f9",
        XL: "69ff0c91846143", "2XL": "69ff0c91846197", "3XL": "69ff0c918461d6"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_005",
    name: "I Support ADHD",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "🧠",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffada906fa2.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008e105cedc.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008e105d4a9.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008e105da3e.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008e105c65f.png"
    ],
    description: "Alcohol. Drugs. Horrible Sleep. Doomscrolling. Wait — you thought this was about something else? Either way, same energy.",
    variants: {
      Black: {
        S: "69ff0fe399fc64", M: "69ff0fe399fcc9", L: "69ff0fe399fd12",
        XL: "69ff0fe399fda8", "2XL": "69ff0fe399fde6", "3XL": "69ff0fe399fe31"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_007",
    name: "Always on Some Bullshit",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "💩",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-6a018eadd8235.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a018eadd8235.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a018eadd856b.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a018eadd878c.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-6a018ed977728.png"
    ],
    description: "Not a phase. Not a bad week. A lifestyle. Professionally, chronically, spiritually — always on some bullshit.",
    variants: {
      Black: {
        S: "6a018dfe853c74", M: "6a018dfe853cd1", L: "6a018dfe853d27",
        XL: "6a018dfe853d77", "2XL": "6a018dfe853db2", "3XL": "6a018dfe853e02"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  },
  {
    id: "prod_006",
    name: "AI Took My Job",
    price: 19.99,
    originalPrice: 29.99,
    emoji: "🤖",
    image: "images/unisex-basic-softstyle-t-shirt-black-front-69ffadeab8075.png",
    images: [
      "images/unisex-basic-softstyle-t-shirt-black-front-6a008cafc60e4.png",
      "images/unisex-basic-softstyle-t-shirt-black-left-front-6a008cafc6698.png",
      "images/unisex-basic-softstyle-t-shirt-black-front-and-back-6a008cafc6c54.png",
      "images/unisex-basic-softstyle-t-shirt-black-back-6a008cafc59aa.png"
    ],
    description: "It happened fast. One day you had a career, the next day a chatbot does it better and charges less. Wear your grief with dignity.",
    soldOutSizes: ["3XL"],
    variants: {
      Black: {
        S: "69ff10766f3868", M: "69ff10766f38d5", L: "69ff10766f3922",
        XL: "69ff10766f3968", "2XL": "69ff10766f39b7"
      }
    },
    defaultColor: "Black", availableColors: ["Black"]
  }
];
