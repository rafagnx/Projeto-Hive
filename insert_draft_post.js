require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@instapost.local' } });
  let userId;
  if (!user) {
    console.log("Admin user not found. Using first user.");
    const firstUser = await prisma.user.findFirst();
    if (!firstUser) {
        console.log("No users found at all in the DB.");
        return;
    }
    userId = firstUser.id;
  } else {
    userId = user.id;
  }
  
  const post = await prisma.post.create({
    data: {
      userId,
      caption: `Contractors, landscapers, and masons: the 2026 season is upon us! 🚜💪\n\nIt’s time to dial in your materials, get your technical questions answered directly by the official factory reps, and stay ahead with the newest product lines. Join us at Old Station Outdoor & Landscape Supply for Vendors Week (April 13th–17th).\n\n📅 Check out the daily schedule:\n• April 13 – Unilock\n• April 14 – Nicolock\n• April 15 – Alliance & Deltile\n• April 16 – Belgard & Techniseal\n• April 17 – Techo-Bloc & SRW\n\n📍 Location: 142 East Main St, Norton, MA\n\nStop by, grab some coffee, connect with the best hardscape brands in the industry, and let’s set your upcoming projects up for success!\n\n🔗 Details at oldstationsupply.com`,
      status: "DRAFT",
      hashtags: [
        "#Hardscape", "#LandscapingLife", "#Contractors", "#Masonry", 
        "#Unilock", "#Belgard", "#TechoBloc", "#Nicolock", 
        "#OldStationSupply", "#MassachusettsContractor", "#HardscapeBrotherhood"
      ],
      aspectRatio: "4:5",
      isCarousel: false,
      mediaType: "IMAGE",
      publishMode: "FEED",
      source: "WEB",
      editorState: {
        "aspectRatio": "4:5",
        "brandId": "default",
        "globalStyle": {
          "showCorners": true,
          "showIndicators": false,
          "cornerFontSize": 18,
          "cornerEdgeDistance": 60,
          "cornerOpacity": 90,
          "cornerGlass": true,
          "cornerBorder": false,
          "bottomRightIcon": "none"
        },
        "slides": [
          {
            "id": "slide-vendor-cover-01",
            "template": "hero",
            "backgroundUrl": "https://raw.githubusercontent.com/helioribeiro/instapost-public/main/old_station_vendors_bg.png",
            "backgroundPrompt": "Pro-level hardscape construction site, extreme shallow depth of field, focused on premium paving stones, raw natural stone, and heavy construction equipment blurred in the background, sunset lighting, golden hour, highly detailed, dramatic shadows, cinematic, clean professional aesthetic, no text, no words",
            "title": "GEAR UP FOR THE 2026 SEASON",
            "subtitle": "VENDORS WEEK IS HERE. CONNECT DIRECTLY WITH INDUSTRY EXPERTS.",
            "label": "OLD STATION SUPPLY",
            "stat": "4/13 - Unilock | 4/14 - Nicolock | 4/15 - Alliance & Deltile | 4/16 - Belgard & Techniseal | 4/17 - Techo-Bloc & SRW",
            "position": "center",
            "fontFamily": "Inter",
            "fontWeight": 800,
            "titleColor": "#ffffff",
            "overlayOpacity": 65,
            "slideNumber": 1,
            "totalSlides": 1
          }
        ]
      }
    }
  });
  console.log("Post created successfully with ID: " + post.id);
}

run().catch(console.error).finally(() => prisma.$disconnect());
