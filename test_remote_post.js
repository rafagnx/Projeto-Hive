const payload = {
    caption: `Contractors, landscapers, and masons: the 2026 season is upon us! 🚜💪\n\nIt’s time to dial in your materials, get your technical questions answered directly by the official factory reps, and stay ahead with the newest product lines. Join us at Old Station Outdoor & Landscape Supply for Vendors Week (April 13th–17th).\n\n📅 Check out the daily schedule:\n• April 13 – Unilock\n• April 14 – Nicolock\n• April 15 – Alliance & Deltile\n• April 16 – Belgard & Techniseal\n• April 17 – Techo-Bloc & SRW\n\n📍 Location: 142 East Main St, Norton, MA\n\nStop by, grab some coffee, connect with the best hardscape brands in the industry, and let’s set your upcoming projects up for success!\n\n🔗 Details at oldstationsupply.com`,
    imageUrl: "https://raw.githubusercontent.com/helioribeiro/instapost-public/main/old_station_vendors_bg.png",
    imageSource: "URL",
    source: "WEB",
    aspectRatio: "4:5",
    hashtags: [
      "#Hardscape", "#LandscapingLife", "#Contractors", "#Masonry", 
      "#Unilock", "#Belgard", "#TechoBloc", "#Nicolock", 
      "#OldStationSupply", "#MassachusettsContractor", "#HardscapeBrotherhood"
    ],
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
          "backgroundPrompt": "Pro-level hardscape construction site, extreme shallow depth of field, focused on premium paving stones",
          "title": "GEAR UP FOR THE 2026 SEASON",
          "subtitle": "VENDORS WEEK IS HERE. CONNECT DIRECTLY WITH INDUSTRY EXPERTS.",
          "label": "OLD STATION SUPPLY",
          "stat": "4/13 - Unilock | 4/14 - Nicolock | 4/15 - Alliance & Deltile | 4/16 - Belgard & Techniseal",
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
  };

  async function testPorts() {
      const ports = [3001, 3000, 3002];
      for (const port of ports) {
          console.log(`Trying port ${port}...`);
          try {
            const res = await fetch(`http://161.97.144.107:${port}/api/posts`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 2287c0f1edb8b4f4236156ecc1b3870a5c8ad33d5be142de'
                },
                body: JSON.stringify(payload)
            });
            console.log(`Port ${port} response:`, res.status);
            const data = await res.text();
            console.log(`Data from ${port}:`, data);
            if (res.ok) {
                console.log("SUCCESS!");
                return;
            }
          } catch (e) {
              console.log(`Port ${port} failed: ${e.message}`);
          }
      }
  }

  testPorts();
