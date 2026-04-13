async function main() {
    const API = 'http://161.97.144.107:3001';
    
    // Step 1: Login to get JWT token
    console.log('--- Logging in ---');
    const loginRes = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'admin@instapost.local',
            password: 'admin123'
        })
    });
    const loginData = await loginRes.json();
    if (!loginData.success) {
        console.log('Login failed:', JSON.stringify(loginData));
        return;
    }
    const token = loginData.data.token;
    console.log('Login OK! Token received.');
    
    // Step 2: Create the post
    console.log('\n--- Creating Vendors Week post ---');
    const createRes = await fetch(`${API}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            caption: "Contractors, landscapers, and masons: the 2026 season is upon us! 🚜💪\n\nIt's time to dial in your materials, get your technical questions answered directly by the official factory reps, and stay ahead with the newest product lines. Join us at Old Station Outdoor & Landscape Supply for Vendors Week (April 13th–17th).\n\n📅 Check out the daily schedule:\n• April 13 – Unilock\n• April 14 – Nicolock\n• April 15 – Alliance & Deltile\n• April 16 – Belgard & Techniseal\n• April 17 – Techo-Bloc & SRW\n\n📍 Location: 142 East Main St, Norton, MA\n\nStop by, grab some coffee, connect with the best hardscape brands in the industry, and let's set your upcoming projects up for success!\n\n🔗 Details at oldstationsupply.com",
            hashtags: ["#Hardscape", "#LandscapingLife", "#Contractors", "#Masonry", "#Unilock", "#Belgard", "#TechoBloc", "#Nicolock", "#OldStationSupply", "#MassachusettsContractor", "#HardscapeBrotherhood"],
            aspectRatio: "4:5",
            source: "MCP",
            editorState: {
                aspectRatio: "4:5",
                slides: [{
                    id: "slide-vendor-cover-01",
                    template: "hero",
                    backgroundPrompt: "Pro-level hardscape construction site, shallow depth of field, premium paving stones, sunset golden hour, cinematic, no text",
                    title: "GEAR UP FOR THE 2026 SEASON",
                    subtitle: "VENDORS WEEK IS HERE. CONNECT DIRECTLY WITH INDUSTRY EXPERTS.",
                    label: "OLD STATION SUPPLY",
                    stat: "4/13 - Unilock | 4/14 - Nicolock | 4/15 - Alliance & Deltile | 4/16 - Belgard & Techniseal | 4/17 - Techo-Bloc & SRW",
                    position: "center",
                    fontFamily: "Inter",
                    fontWeight: 800,
                    titleColor: "#ffffff",
                    overlayOpacity: 65,
                    slideNumber: 1,
                    totalSlides: 1
                }]
            }
        })
    });
    const createData = await createRes.json();
    console.log('Create post response:', createRes.status);
    console.log(JSON.stringify(createData, null, 2));
}

main().catch(console.error);
