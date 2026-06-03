"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Menu, X, CheckCircle, 
  ShieldCheck, Award, FileText, 
  ChevronRight, ArrowUpRight, 
  Building, UserCheck, Key, Sparkles, MapPin, Phone, Mail
} from "lucide-react";
import Image from "next/image";

// Placeholder images (can be replaced with real URLs)
const heroBg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000";
const aboutImg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800";

const partnerCondos = [{ name: "RICHY" }, { name: "REAL ASSET CONDO" }];
const partnerHouses = [
  { name: "RUNGKIJ" }, { name: "BRITANIA" }, { name: "CHEWATHAI" }, 
  { name: "THE URBAN" }, { name: "NAKHONTHONG" }, { name: "AKRA" }, 
  { name: "REVO ESTATE" }, { name: "NC GROUP" }, { name: "YOUR CORP" }, 
  { name: "REAL ASSET" }, { name: "PIEAMSUK" }, { name: "LPN" }, { name: "AESTIMA" }
];

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [contactForm, setContactForm] = useState({ name: "", "email-tel": "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  
  const [careerForm, setCareerForm] = useState({ name: "", email: "", tel: "", position: "credit-consultant", experience: "", resume: null, message: "" });
  const [careerSuccess, setCareerSuccess] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const encode = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return formData;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch("/", { method: "POST", body: encode({ "form-name": "contact", ...contactForm }) });
      setContactSuccess(true);
      setContactForm({ name: "", "email-tel": "", message: "" });
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setContactLoading(false);
    }
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    setCareerLoading(true);
    try {
      await fetch("/", { method: "POST", body: encode({ "form-name": "job-application", ...careerForm }) });
      setCareerSuccess(true);
      setCareerForm({ name: "", email: "", tel: "", position: "credit-consultant", experience: "", resume: null, message: "" });
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setCareerLoading(false);
    }
  };

  const filteredPartners = () => activeTab === "condo" ? partnerCondos : activeTab === "house" ? partnerHouses : [...partnerCondos, ...partnerHouses];

  // Animation variants
  const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="relative min-h-screen bg-navy-950 text-cream-50 font-sans selection:bg-gold-500 selection:text-navy-950 bg-noise overflow-hidden">
      
      {/* 1. Navbar (Glassmorphism) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-4 shadow-lg shadow-black/50" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <span className="font-serif font-bold text-gold-400 text-2xl drop-shadow-[0_0_8px_rgba(223,164,84,0.5)]">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-[0.1em] text-white group-hover:text-gold-300 transition-colors duration-300">
                THE GOLDEN
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400/80 font-light mt-0.5">
                Development
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {["หน้าแรก", "บริการ", "โครงการพาร์ทเนอร์", "ร่วมงานกับเรา", "ติดต่อเรา"].map((item, idx) => {
              const href = ["#hero", "#services", "#projects", "#careers", "#contact"][idx];
              return (
                <a key={item} href={href} className="text-sm font-light text-cream-100/70 hover:text-gold-300 transition-colors duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
            <a href="#contact" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-navy-950/80 backdrop-blur-md px-6 py-2.5 rounded-full flex items-center gap-2 group-hover:bg-navy-950/40 transition-colors duration-300">
                <span className="text-sm font-semibold text-gold-300 group-hover:text-white transition-colors duration-300">ปรึกษาฟรี</span>
                <ArrowUpRight size={16} className="text-gold-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gold-300 p-2 z-50 relative">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full glass border-t border-white/5 py-6 px-6 flex flex-col gap-6 lg:hidden"
            >
              {["หน้าแรก", "บริการ", "โครงการพาร์ทเนอร์", "ร่วมงานกับเรา", "ติดต่อเรา"].map((item, idx) => {
                const href = ["#hero", "#services", "#projects", "#careers", "#contact"][idx];
                return (
                  <a key={item} href={href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-light text-cream-100 border-b border-white/5 pb-2">
                    {item}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <Image src={heroBg} alt="Luxury Real Estate" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          {/* Animated Orbs */}
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold-600/20 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-navy-400/20 rounded-full blur-[120px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-500/5 backdrop-blur-sm">
            <Sparkles size={14} className="text-gold-400 animate-pulse" />
            <span className="text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase">Premium Real Estate Partner</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            เป็นเจ้าของบ้านในฝัน <br/>
            <span className="text-gradient-gold italic pr-4">ง่ายกว่าที่คิด</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-8 text-lg md:text-xl text-cream-200/60 max-w-2xl font-light leading-relaxed">
            ที่ปรึกษาสินเชื่ออสังหาริมทรัพย์ระดับเอ็กซ์คลูซีฟ <br className="hidden md:block"/>
            ช่วยคุณขจัดทุกความยุ่งยาก พร้อม <span className="text-gold-400 font-medium">บริการให้คำปรึกษาฟรี</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-12 flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="group relative px-8 py-4 rounded-full overflow-hidden bg-gold-500 text-navy-950 font-bold text-sm tracking-widest uppercase transition-transform hover:scale-105">
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              <span className="relative flex items-center gap-2">เริ่มปรึกษาฟรี <ChevronRight size={16} /></span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400/50">Scroll Down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[1px] h-12 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </motion.div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-32 relative z-10 bg-navy-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Image Box */}
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 border border-gold-500/20 rounded-2xl transform rotate-3 transition-transform hover:rotate-0 duration-700"></div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card p-2">
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image src={aboutImg} alt="Luxury Interior" fill className="object-cover opacity-80 mix-blend-lighten" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeUp} className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[1px] bg-gold-500"></span>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-[0.2em]">เกี่ยวกับเรา</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                พาร์ทเนอร์ที่จะเปลี่ยน <br/>
                การซื้อบ้าน <span className="text-gradient-gold">ให้สมบูรณ์แบบ</span>
              </h2>
              <p className="text-cream-100/60 font-light leading-relaxed text-lg">
                <strong className="text-gold-300 font-medium">THE GOLDEN DEVELOPMENT</strong> เราคือที่ปรึกษาสินเชื่อและบริการอสังหาริมทรัพย์ระดับมืออาชีพ เราไม่ใช่เจ้าของโครงการ แต่เราคือตัวแทนของคุณที่จะคอยเคียงข้าง จัดเตรียมเอกสาร วางแผนการเงิน และดีลกับธนาคารเพื่อให้คุณได้ข้อเสนอที่ดีที่สุด
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                {[
                  { icon: ShieldCheck, title: "ให้คำปรึกษาฟรี", desc: "ไม่มีค่าใช้จ่ายแอบแฝงในการประเมิน" },
                  { icon: Award, title: "พันธมิตรธนาคารชั้นนำ", desc: "เปรียบเทียบดอกเบี้ยที่ดีที่สุด" },
                  { icon: UserCheck, title: "ดูแลแบบครบวงจร", desc: "ตั้งแต่ยื่นกู้จนถึงโอนกรรมสิทธิ์" },
                  { icon: Building, title: "โครงการหลากหลาย", desc: "เชื่อมต่อกับดีเวลลอปเปอร์ชั้นนำ" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-50 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-cream-100/50 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-32 relative bg-navy-900 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 flex flex-col items-center">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-[0.2em] mb-4">บริการของเรา</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">โซลูชัน <span className="text-gradient-gold">ครบวงจร</span></h2>
            <p className="text-cream-100/50 max-w-2xl font-light">ยกระดับประสบการณ์การลงทุนในอสังหาริมทรัพย์ของคุณให้เป็นเรื่องง่าย ปลอดภัย และคุ้มค่าด้วยบริการระดับพรีเมียม</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "ปรึกษาปิดหนี้ก่อนยื่นกู้", desc: "วางแผนจัดการภาระหนี้ ปรับปรุง Credit Score เพื่อเพิ่มโอกาสการอนุมัติสินเชื่อให้ผ่านฉลุย" },
              { icon: Key, title: "บริการเช่า และ เช่าซื้อ", desc: "ดูแลหลังการขายอย่างเป็นมืออาชีพ จัดหาผู้เช่าคุณภาพและระบบ Rent-to-own ที่มั่นคง" },
              { icon: ShieldCheck, title: "บริการตรวจ Defect", desc: "ตรวจสอบความเรียบร้อยก่อนรับมอบโดยวิศวกรผู้เชี่ยวชาญ ป้องกันปัญหาบานปลาย" }
            ].map((srv, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card p-10 rounded-2xl group gold-glow-hover transition-all duration-500 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                  <srv.icon size={120} />
                </div>
                <div className="mb-8 p-4 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 w-fit group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors duration-300">
                  <srv.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 font-serif">{srv.title}</h3>
                <p className="text-cream-100/60 font-light text-sm leading-relaxed flex-grow">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Projects Section (Infinite/Staggered Style) */}
      <section id="projects" className="py-32 relative bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-[0.2em] mb-4 block">พันธมิตรโครงการ</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">แบรนด์ระดับ <span className="text-gradient-gold">แนวหน้า</span></h2>
            </div>
            
            <div className="flex gap-2 p-1.5 glass rounded-xl border border-gold-500/10">
              {["all", "condo", "house"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 text-sm transition-all rounded-lg ${activeTab === tab ? "bg-gold-500/20 text-gold-300 border border-gold-500/30" : "text-cream-100/50 hover:text-cream-100"}`}>
                  {tab === "all" ? "ทั้งหมด" : tab === "condo" ? "คอนโด" : "บ้าน/ทาวน์โฮม"}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredPartners().map((partner) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} key={partner.name} className="h-28 glass-card border border-white/5 rounded-xl flex items-center justify-center p-4 hover:border-gold-500/50 transition-colors group">
                  <span className="font-serif font-bold text-xs uppercase tracking-widest text-cream-100/40 group-hover:text-gold-400 transition-colors text-center">{partner.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. Contact & Footer (Combined) */}
      <section id="contact" className="py-32 relative bg-navy-950 border-t border-white/5">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-10">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-[0.2em] mb-4 block">ติดต่อเรา</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">เริ่มต้นปรึกษา <span className="text-gradient-gold">ฟรี</span></h2>
                <p className="text-cream-100/60 font-light leading-relaxed">
                  กรอกข้อมูลเพื่อให้ผู้เชี่ยวชาญของเราติดต่อกลับ หรือติดต่อเราโดยตรงผ่านช่องทางด้านล่าง
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Phone, text: "09X-XXX-XXXX", label: "โทรศัพท์" },
                  { icon: Mail, text: "contact@thegoldendev.com", label: "อีเมล" },
                  { icon: MapPin, text: "กรุงเทพมหานคร, ประเทศไทย", label: "ที่ตั้ง" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full glass border border-gold-500/20 flex items-center justify-center text-gold-400">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-cream-100/40 uppercase tracking-widest">{item.label}</p>
                      <p className="font-medium text-cream-50">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl"></div>
                
                {contactSuccess ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-6 border border-gold-500/30">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">ส่งข้อความสำเร็จ</h3>
                    <p className="text-cream-100/60 font-light text-sm">เราจะติดต่อกลับโดยเร็วที่สุด ขอบคุณที่ให้ความไว้วางใจ THE GOLDEN DEVELOPMENT</p>
                  </div>
                ) : (
                  <form name="contact" method="POST" data-netlify="true" onSubmit={handleContactSubmit} className="flex flex-col gap-5 relative z-10">
                    <input type="hidden" name="form-name" value="contact" />
                    <div>
                      <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2 block">ชื่อ - นามสกุล</label>
                      <input type="text" name="name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="form-input" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2 block">เบอร์โทร / อีเมล</label>
                      <input type="text" name="email-tel" value={contactForm["email-tel"]} onChange={(e) => setContactForm({...contactForm, "email-tel": e.target.value})} required className="form-input" placeholder="Your contact info" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2 block">ข้อความ</label>
                      <textarea name="message" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required rows={4} className="form-input resize-none" placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" disabled={contactLoading} className="mt-4 w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-navy-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(223,164,84,0.3)] hover:shadow-[0_0_30px_rgba(223,164,84,0.5)] flex items-center justify-center gap-2">
                      {contactLoading ? "กำลังส่ง..." : <>ส่งข้อความ <ArrowUpRight size={18} /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-navy-950 border-t border-white/5 text-center relative z-10">
        <p className="text-xs font-light text-cream-100/30 tracking-widest">
          &copy; {new Date().getFullYear()} THE GOLDEN DEVELOPMENT. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
