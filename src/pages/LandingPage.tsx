import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Users, Bell, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Google Fonts for better typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-xl text-foreground">Sisterhood</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`font-body text-sm font-medium capitalize transition-colors ${
                    activeSection === item ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item === "contact" ? "Contact Us" : item}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("download")}
                className="rounded-full px-6 bg-primary hover:bg-sage-dark text-primary-foreground font-body"
              >
                Download
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {["home", "about", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-left font-body text-lg font-medium capitalize py-2"
                  >
                    {item === "contact" ? "Contact Us" : item}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("download")}
                  className="rounded-full bg-primary hover:bg-sage-dark text-primary-foreground mt-2 font-body"
                >
                  Download
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush-light/40 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-body text-sm font-medium text-muted-foreground">Now available on iOS & Android</span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl text-foreground leading-tight">
              Your sisters
              <br />
              <span className="text-primary">are here</span>
            </h1>
            
            <p className="font-body text-lg text-muted-foreground max-w-md leading-relaxed">
              A space where women support each other through every cycle, every mood, every moment. Connect, share, and care — together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Official App Store Badge */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-14"
                />
              </motion.a>
              
              {/* Official Google Play Badge */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-14"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Phone Mockup - Accurate HomeScreen */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* iPhone Frame */}
              <div className="w-[320px] lg:w-[360px] rounded-[3rem] bg-foreground/10 p-3 shadow-2xl border border-foreground/5">
                <div className="rounded-[2.5rem] overflow-hidden bg-background border border-border/30">
                  {/* Status Bar */}
                  <div className="px-8 pt-3 pb-2 flex items-center justify-between">
                    <span className="font-body text-xs font-semibold">9:41</span>
                    <div className="w-28 h-7 rounded-full bg-foreground" />
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-3 rounded-sm bg-foreground/70" />
                    </div>
                  </div>
                  
                  {/* App Content - Matches HomeScreen */}
                  <div className="px-5 pb-4 pt-3 space-y-4" style={{ background: 'linear-gradient(180deg, hsl(80 30% 96%) 0%, hsl(350 35% 96%) 100%)' }}>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-display text-xl">
                          Good evening, <span className="text-primary">Maya</span> ✨
                        </h2>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">Your sisters are thinking of you</p>
                      </div>
                      <div className="relative p-2">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-coral text-[10px] flex items-center justify-center text-white font-body font-semibold">2</span>
                      </div>
                    </div>

                    {/* Sisterhood Tabs */}
                    <div className="flex gap-2 overflow-hidden">
                      <div className="px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold flex items-center gap-1.5 whitespace-nowrap">
                        <Users className="w-3.5 h-3.5" />
                        All Sisters
                      </div>
                      <div className="px-4 py-2.5 rounded-full bg-card border border-border text-muted-foreground text-xs font-body font-medium whitespace-nowrap">
                        🌊 Crimson Wave (4)
                      </div>
                      <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center">
                        <span className="text-sm">🌿</span>
                      </div>
                    </div>

                    {/* Mood Status Card */}
                    <div className="p-5 rounded-3xl bg-sage-light/40 border border-sage-light/60 backdrop-blur-sm">
                      <p className="font-display text-base mb-4">How are you feeling today?</p>
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        {[
                          { emoji: "😊", label: "Happy", active: true },
                          { emoji: "😌", label: "Calm", active: false },
                          { emoji: "😔", label: "Low", active: false },
                          { emoji: "😤", label: "Moody", active: false },
                        ].map((mood, i) => (
                          <div 
                            key={i} 
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center ${
                              mood.active ? 'bg-sage-light border-2 border-primary/30' : 'bg-card/80'
                            }`}
                          >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="font-body text-[10px] mt-1 text-muted-foreground">{mood.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { emoji: "😴", label: "Tired" },
                          { emoji: "🥰", label: "Grateful" },
                          { emoji: "🥺", label: "Emotional" },
                          { emoji: "💪", label: "Strong" },
                        ].map((mood, i) => (
                          <div key={i} className="aspect-square rounded-2xl bg-card/80 flex flex-col items-center justify-center">
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="font-body text-[10px] mt-1 text-muted-foreground">{mood.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feed Header */}
                    <h3 className="font-display text-base pt-1">All Sisters Updates</h3>
                    
                    {/* Sister Update Card */}
                    <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush to-secondary flex items-center justify-center text-xl overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" 
                              alt="Sarah" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="absolute -bottom-1 -right-1 text-base bg-background rounded-full">😔</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-sm">Sarah</span>
                            <span className="font-body text-[10px] text-muted-foreground flex-shrink-0">2h ago</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="font-body text-xs text-muted-foreground">Feeling low today</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-muted">Day 2</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-muted">Crimson Wave</span>
                          </div>
                          <p className="font-body text-xs mt-2 text-foreground/90">Could really use some chocolate and a good movie recommendation 🍫</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="px-4 py-3 bg-background border-t border-border/50 flex justify-around">
                    {[
                      { icon: "🏠", label: "Home", active: true },
                      { icon: "👯", label: "Sisters", active: false },
                      { icon: "🎁", label: "Gifts", active: false },
                      { icon: "🔔", label: "Notifs", active: false },
                      { icon: "👤", label: "Profile", active: false },
                    ].map((item, i) => (
                      <div key={i} className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${item.active ? 'bg-sage-light/50' : ''}`}>
                        <span className="text-xl">{item.icon}</span>
                        <span className={`font-body text-[9px] ${item.active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-blush flex items-center justify-center shadow-lg border border-blush-light"
              >
                <Heart className="w-8 h-8 text-coral" fill="currentColor" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -left-6 w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center shadow-lg border border-sage/30"
              >
                <Gift className="w-7 h-7 text-sage-dark" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🌸", label: "Cycle Tracking", desc: "Know your rhythm" },
              { icon: "💝", label: "Send Gifts", desc: "Recognise your sisters with small gestures" },
              { icon: "👯‍♀️", label: "Sister Circles", desc: "Your sisterhood" },
              { icon: "✨", label: "Mood Updates", desc: "Get support and affirmations from your sisters" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-display text-lg text-foreground mb-1">{feature.label}</h3>
                <p className="font-body text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-lavender/30 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <span className="font-body text-primary font-medium">About Sisterhood</span>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground">
              Built by women,
              <br />
              for women
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              We believe that supporting each other shouldn't be complicated. Sisterhood is a safe, 
              intimate space where you can share your cycle, your mood, and receive care from 
              the women who matter most — your sisters, your friends, your circle.
            </p>
          </motion.div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Private & Safe",
                desc: "Your data stays yours. Share only with your chosen circle.",
                icon: "🔒",
              },
              {
                title: "Thoughtful Care",
                desc: "Send and receive care packages when someone needs a lift.",
                icon: "💌",
              },
              {
                title: "Real Connection",
                desc: "No algorithms, no strangers. Just your trusted sisterhood.",
                icon: "🤝",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border/50 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-display text-xl mb-2">{card.title}</h3>
                <p className="font-body text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center space-y-6"
          >
            <span className="font-body text-primary font-medium">Get in Touch</span>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground">
              Contact Us
            </h2>
            <p className="font-body text-muted-foreground">
              Have questions, feedback, or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="pt-8 space-y-4">
              <a 
                href="mailto:support@sisterhood-app.com"
                className="block font-body text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                support@sisterhood-app.com
              </a>
              <div className="flex justify-center gap-6 pt-4">
                {["Twitter", "Instagram", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-body text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-light/20 via-background to-blush-light/20" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="font-display text-5xl lg:text-6xl text-foreground">
              Join your sisterhood
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-md mx-auto">
              Download now and start supporting the women who matter most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {/* Official App Store Badge */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-16"
                />
              </motion.a>
              
              {/* Official Google Play Badge */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-16"
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-foreground">Sisterhood</span>
            </div>
            
            <p className="font-body text-sm text-muted-foreground">
              © 2026 Sisterhood. Made with love.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
