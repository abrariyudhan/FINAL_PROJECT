"use client";

import { AppFooter } from "@/components/Footer";
import DotGrid from "@/components/DotGrid";
import TextType from "@/components/TextType";
import OrbitImages from "@/components/OrbitImages";
import ScrollReveal from "@/components/ScrollFloat"; 
import CountUp from "@/components/CountUp";
import Link from "next/link";
// ✅ Import react-icons
import { FiGrid, FiBell, FiTrendingUp, FiDollarSign } from "react-icons/fi";

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
      {/* Add keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
          }
        `
      }} />

      {/* HERO SECTION */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '500px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.5) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite reverse'
        }} />

        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.3 }}>
          <DotGrid 
            dotSize={4} 
            gap={20} 
            baseColor="#ffffff" 
            activeColor="#ffffff" 
            proximity={100} 
            shockRadius={200} 
            shockStrength={6} 
            resistance={900} 
            returnDuration={2} 
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontWeight: '900', 
            fontSize: '4rem', 
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            letterSpacing: '-0.02em'
          }}>
            With SubTrack8
          </h1>
          <div style={{ 
            color: '#e0e7ff', 
            fontSize: '1.5rem', 
            fontWeight: '600',
            textShadow: '0 2px 10px rgba(0,0,0,0.15)'
          }}>
            <TextType
              text={[
                "Manage all your subscriptions in one place", 
                "Track your monthly spending effortlessly", 
                "Never get surprised by hidden renewals", 
                "Optimize your digital lifestyle today"
              ]}
              typingSpeed={80} 
              pauseDuration={1500} 
              showCursor 
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </div>
        </div>
      </div>

      <main style={{ 
        background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        width: '100%',
        position: 'relative'
      }}>
        
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0
        }} />
        
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '3%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0
        }} />

        <section style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center',
          padding: '100px 10% 80px 10%',
          gap: '60px',
          overflow: 'visible',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '30px',
              lineHeight: '1.2'
            }}>
              Your Subscription Command Center
            </h2>
            <div style={{ 
              fontSize: '1.1rem', 
              color: '#475569', 
              maxWidth: '550px', 
              lineHeight: '1.8',
              fontWeight: '400'
            }}>
              <ScrollReveal 
                baseOpacity={0.1} 
                enableBlur 
                baseRotation={10} 
                blurStrength={5}
              >
                SubTrack8 makes it easy to monitor your monthly subscription costs for various entertainment and productivity platforms in real time. Don&apos;t let your balance get drained by forgotten bills.
              </ScrollReveal>
            </div>
          </div>
          <div style={{ 
            position: 'relative', 
            height: '400px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <OrbitImages 
              images={images} 
              shape="ellipse" 
              radiusX={400} 
              radiusY={400} 
              rotation={-10} 
              duration={45} 
              itemSize={180} 
              responsive={true} 
              radius={180} 
              direction="normal" 
              fill={true} 
              showPath={true} 
              paused={false} 
            />
          </div>
        </section>

        {/* ✅ WHY CHOOSE SECTION - Updated with react-icons */}
        <section style={{ 
          padding: '80px 10%', 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '60px', 
            color: '#1e293b',
            letterSpacing: '-0.02em'
          }}>
            Why Choose SubTrack8?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '30px'
          }}>
            {[
              { 
                title: "Centralized View", 
                desc: "See all your active subscriptions across platforms in one single, clean dashboard.",
                Icon: FiGrid, // ✅ Component instead of emoji
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              },
              { 
                title: "Smart Alerts", 
                desc: "Get notified before the trial ends or when a price hike is detected on your bills.",
                Icon: FiBell, // ✅ Component instead of emoji
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              },
              { 
                title: "Spending Analytics", 
                desc: "Visualize where your money goes with monthly reports and category breakdowns.",
                Icon: FiTrendingUp, // ✅ Component instead of emoji
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              },
              { 
                title: "Cost Optimization", 
                desc: "Identify unused services and get suggestions to switch to cheaper family plans.",
                Icon: FiDollarSign, // ✅ Component instead of emoji
                gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                padding: '35px 25px', 
                borderRadius: '24px', 
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              }}
              >
                {/* ✅ Icon container with react-icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: item.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                }}>
                  <item.Icon size={36} color="#ffffff" strokeWidth={2.5} />
                </div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#64748b', 
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ 
          textAlign: 'center', 
          padding: '80px 0 100px 0', 
          position: 'relative',
          zIndex: 1
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '30px'
          }}>
            Ready to Take Control?
          </h3>
          <Link href="/dashboard">
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '18px 50px',
              fontSize: '1.1rem',
              fontWeight: '700',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.4)';
            }}
            >
              Get Started Now →
            </button>
          </Link>
        </section>

        {/* STATS SECTION */}
        <div style={{ 
          padding: '60px 10% 100px 10%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '40px',
            textAlign: 'center', 
            padding: '50px 40px', 
            borderRadius: '32px',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }}>
            {[
              { value: 12, suffix: '.5K+', label: 'Active Users', color: '#667eea' },
              { value: 450, suffix: 'K+', label: 'Subscriptions Tracked', color: '#764ba2' },
              { value: 2.4, prefix: '$', suffix: 'M', label: 'Expenses Saved', color: '#43e97b' }
            ].map((stat, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                borderRight: idx < 2 ? '2px solid rgba(0,0,0,0.05)' : 'none',
                paddingRight: idx < 2 ? '40px' : '0'
              }}>
                <div style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: '900', 
                  color: stat.color,
                  letterSpacing: '-0.03em'
                }}>
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUp from={0} to={stat.value} duration={2 + idx * 0.5} separator="," />
                  <span>{stat.suffix}</span>
                </div>
                <span style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  color: '#64748b', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}