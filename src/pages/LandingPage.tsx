import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Smartphone, Menu, X, Heart, Users, Bell, Gift } from "lucide-react";
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
              <span className="font-serif text-xl font-semibold text-foreground">Sisterhood</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium capitalize transition-colors ${
                    activeSection === item ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item === "contact" ? "Contact Us" : item}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("download")}
                className="rounded-full px-6 bg-primary hover:bg-sage-dark text-primary-foreground"
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
                    className="text-left text-lg font-medium capitalize py-2"
                  >
                    {item === "contact" ? "Contact Us" : item}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("download")}
                  className="rounded-full bg-primary hover:bg-sage-dark text-primary-foreground mt-2"
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
              <span className="text-sm font-medium text-muted-foreground">Now available on iOS & Android</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
              Your sisters
              <br />
              <span className="text-primary">are here</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              A space where women support each other through every cycle, every mood, every moment. Connect, share, and care — together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-6 py-4 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-colors"
              >
                <Apple className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-6 py-4 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-colors"
              >
                <PlayStoreIcon />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 lg:w-80 rounded-[3rem] bg-foreground/5 p-3 shadow-2xl">
                <div className="rounded-[2.5rem] overflow-hidden bg-background border border-border/50">
                  {/* Status Bar */}
                  <div className="px-6 py-3 flex items-center justify-between">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="w-20 h-6 rounded-full bg-foreground" />
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm bg-foreground/60" />
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="px-5 pb-6 pt-2 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-serif font-semibold">Good evening, Maya ✨</h2>
                        <p className="text-xs text-muted-foreground">Your sisters are thinking of you</p>
                      </div>
                      <div className="relative">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral text-[10px] flex items-center justify-center text-white">2</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2">
                      <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        All Sisters
                      </div>
                      <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        🌊 Crimson Wave (4)
                      </div>
                    </div>

                    {/* Mood Card */}
                    <div className="p-4 rounded-3xl bg-sage-light/30 border border-sage-light/50">
                      <p className="text-sm font-medium mb-3">How are you feeling today?</p>
                      <div className="grid grid-cols-4 gap-2">
                        {["😊", "😌", "😔", "😤"].map((emoji, i) => (
                          <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xl ${i === 0 ? 'bg-sage-light' : 'bg-muted/50'}`}>
                            {emoji}
                            <span className="text-[9px] mt-0.5 text-muted-foreground">
                              {["Happy", "Calm", "Low", "Moody"][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sister Update */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">All Sisters Updates</h3>
                      <div className="p-4 rounded-2xl bg-card border border-border/50">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                              👩🏽
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 text-sm">😔</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold font-serif">Sarah</span>
                              <span className="text-[10px] text-muted-foreground">2h ago</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Feeling low today • Day 2</p>
                            <p className="text-xs mt-1">Could really use some chocolate 🍫</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="px-6 py-4 border-t border-border/50 flex justify-around">
                    {[
                      { icon: "🏠", label: "Home", active: true },
                      { icon: "👯", label: "Sisters", active: false },
                      { icon: "🎁", label: "Gifts", active: false },
                      { icon: "🔔", label: "Notifs", active: false },
                      { icon: "👤", label: "Profile", active: false },
                    ].map((item, i) => (
                      <div key={i} className={`flex flex-col items-center gap-0.5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-[9px]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-blush flex items-center justify-center shadow-lg"
              >
                <Heart className="w-8 h-8 text-coral" fill="currentColor" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -left-6 w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center shadow-lg"
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
              { icon: "💝", label: "Care Packages", desc: "Send love instantly" },
              { icon: "👯‍♀️", label: "Sister Circles", desc: "Your trusted crew" },
              { icon: "✨", label: "Mood Updates", desc: "Share how you feel" },
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
                <h3 className="font-semibold text-foreground mb-1">{feature.label}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
            <span className="text-primary font-medium">About Sisterhood</span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Built by women,
              <br />
              for women
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
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
                <h3 className="text-xl font-serif font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.desc}</p>
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
            <span className="text-primary font-medium">Get in Touch</span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              Have questions, feedback, or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="pt-8 space-y-4">
              <a 
                href="mailto:hello@sisterhood.app"
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                hello@sisterhood.app
              </a>
              <div className="flex justify-center gap-6 pt-4">
                {["Twitter", "Instagram", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
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
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground">
              Join your sisterhood
            </h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Download now and start supporting the women who matter most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-colors"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-colors"
              >
                <PlayStoreIcon />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
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
              <span className="font-serif font-semibold text-foreground">Sisterhood</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2026 Sisterhood. Made with love.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Google Play Store Icon Component
const PlayStoreIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z"/>
  </svg>
);

export default LandingPage;
