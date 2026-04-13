// Seed user via the API's auth/register endpoint
async function seedUser() {
    const API = 'http://161.97.144.107:3001';
    
    // Try to register
    console.log('Attempting to register admin user...');
    try {
        const res = await fetch(`${API}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@instapost.local',
                password: 'admin123',
                name: 'Admin'
            })
        });
        const data = await res.json();
        console.log('Register response:', res.status, JSON.stringify(data, null, 2));
        
        if (res.ok || data.token) {
            console.log('SUCCESS! User created. Now creating post...');
            const token = data.token;
            await createPost(API, token);
        } else {
            // Maybe user exists, try login
            console.log('Register failed, trying login...');
            const loginRes = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'admin@instapost.local',
                    password: 'admin123'
                })
            });
            const loginData = await loginRes.json();
            console.log('Login response:', loginRes.status, JSON.stringify(loginData, null, 2));
            if (loginData.token) {
                console.log('Login SUCCESS! Creating post...');
                await createPost(API, loginData.token);
            }
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function createPost(API, token) {
    const res = await fetch(`${API}/api/posts`, {
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
                    backgroundPrompt: "Pro-level hardscape construction site, extreme shallow depth of field, focused on premium paving stones, raw natural stone, sunset lighting, golden hour, cinematic, no text",
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
    const data = await res.json();
    console.log('Create post response:', res.status, JSON.stringify(data, null, 2));
}

seedUser();
