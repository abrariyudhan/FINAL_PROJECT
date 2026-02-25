"use client";

import { AppFooter } from "@/components/Footer";
import DotGrid from "@/components/DotGrid";
import TextType from "@/components/TextType";
import OrbitImages from "@/components/OrbitImages";
import ScrollReveal from "@/components/ScrollFloat"; 
import CountUp from "@/components/CountUp";
import Link from "next/link"; // Jangan lupa import Link

export default function Home() {
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  ];

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '400px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <DotGrid dotSize={5} gap={15} baseColor="#ffffff" activeColor="#3410c6" proximity={120} shockRadius={240} shockStrength={9} resistance={800} returnDuration={1.6} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}>
          <h1 style={{ color: '#000000', fontWeight: 'bold', fontSize: '3.5rem', margin: '0 0 10px 0' }}>With SubTrack8</h1>
          <div style={{ color: '#6666ff', fontSize: '1.8rem', fontWeight: 'bold' }}>
            <TextType
              text={["Manage all your subscriptions in one place", "Track your monthly spending effortlessly", "Never get surprised by hidden renewals", "Optimize your digital lifestyle today"]}
              typingSpeed={80} pauseDuration={1500} showCursor cursorCharacter="_"
              texts={["Welcome to React Bits! Good to see you!", "Build some amazing experiences!"]}
              deletingSpeed={50} variableSpeedEnabled={false} cursorBlinkDuration={0.5}
            />
          </div>
        </div>
      </div>

      {/* SECTION ORBIT */}
      <main style={{ backgroundColor: '#ffffff', width: '100%' }}>
        <section style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center',
          padding: '80px 10%',
          gap: '40px',
          overflow: 'visible'
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1rem', color: '#000000', maxWidth: '550px', lineHeight: '1.6' }}>
              <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={10} blurStrength={5}>
                SubTrack8 makes it easy to monitor your monthly subscription costs for various entertainment and productivity platforms in real time. Don&apos;t let your balance get drained by forgotten bills.
              </ScrollReveal>
            </div>
          </div>
          <div style={{ position: 'relative', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <OrbitImages images={images} shape="ellipse" radiusX={300} radiusY={140} rotation={-10} duration={45} itemSize={80} responsive={true} radius={180} direction="normal" fill={true} showPath={true} paused={false} />
          </div>
        </section>

        {/* --- NEW SECTION: WHY CHOOSE US (4 TABLES) --- */}
        <section style={{ padding: '80px 10%', backgroundColor: '#ffffff' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px', color: '#000' }}>Why Choose SubTrack8?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '20px'
          }}>
            {[
              { title: "Centralized View", desc: "See all your active subscriptions across platforms in one single, clean dashboard." },
              { title: "Smart Alerts", desc: "Get notified before the trial ends or when a price hike is detected on your bills." },
              { title: "Spending Analytics", desc: "Visualize where your money goes with monthly reports and category breakdowns." },
              { title: "Cost Optimization", desc: "Identify unused services and get suggestions to switch to cheaper family plans." }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '25px', borderRadius: '20px', backgroundColor: '#f9f9ff', border: '1px solid #eee', textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3410c6', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: CTA BUTTON --- */}
        <section style={{ textAlign: 'center', padding: '40px 0 60px 0', backgroundColor: '#ffffff' }}>
          <Link href="/dashboard">
            <button style={{
              backgroundColor: '#3410c6',
              color: '#fff',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(52, 16, 198, 0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Started Now
            </button>
          </Link>
        </section>

        {/* SECTION COUNTUP */}
        <div style={{ padding: '60px 10% 80px 10%', backgroundColor: '#ffffff' }}>
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px',
            textAlign: 'center', padding: '40px', borderRadius: '32px',
            backgroundColor: '#fbfbfb', border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#000000' }}>
                <CountUp from={0} to={12} duration={2} separator="," /><span>.5K+</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#3410c6', textTransform: 'uppercase' }}>Active Users</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#000000' }}>
                <CountUp from={0} to={450} duration={2.5} separator="." /><span>K+</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#3410c6', textTransform: 'uppercase' }}>Subscriptions Tracked</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#000000' }}>
                <span>$</span><CountUp from={0} to={2.4} duration={3} separator="," /><span>M</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#3410c6', textTransform: 'uppercase' }}>Expenses Saved</span>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}