"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Menu, X, CheckCircle, 
  TrendingUp, Megaphone, Smartphone, 
  ChevronRight, ArrowUpRight, 
  Truck, Search, MapPin, Phone
} from "lucide-react";
import Image from "next/image";

// Premium Construction/Heavy Machinery Images
const heroBg = "https://images.unsplash.com/photo-1541888081622-67cc3261a877?auto=format&fit=crop&q=80&w=2000";
const aboutImg = "https://images.unsplash.com/photo-1579758781446-24baeb9e2bc1?auto=format&fit=crop&q=80&w=800";

const partnerTypes = [
  { name: "รถแบคโฮ PC30" }, { name: "รถแบคโฮ PC120" }, { name: "รถดัมพ์ 6 ล้อ" }, 
  { name: "รถดัมพ์ 10 ล้อ" }, { name: "รถแทรคเตอร์" }, { name: "รถเครน" }, 
  { name: "รถเกรดเดอร์" }, { name: "รถบดถนน" }, { name: "รถเทรลเลอร์" }, 
  { name: "รถบรรทุกพ่วง" }
];

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactForm, setContactForm] = useState({ name: "", phone: "", trucks: "", "service-area": "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 200]);
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
      await fetch("/", { method: "POST", body: encode({ "form-name": "lead-generation", ...contactForm }) });
      setContactSuccess(true);
      setContactForm({ name: "", phone: "", trucks: "", "service-area": "" });
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setContactLoading(false);
    }
  };

  // Ultra-Smooth Cinematic Animation variants
  const cinematicEase = [0.22, 1, 0.36, 1];
  
  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } 
  };
  
  const fadeUpCinematic = { 
    hidden: { opacity: 0, y: 50 }, 
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: cinematicEase } } 
  };
  
  const slowReveal = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: cinematicEase } }
  };

  return (
    <div className="relative min-h-screen bg-black-950 text-cream-50 font-sans selection:bg-gold-500 selection:text-black-950 bg-noise overflow-hidden">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? "glass py-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-full border border-gold-400/40 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-gold-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
              <Truck className="text-gold-400 group-hover:text-gold-300 transition-colors duration-700" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-[0.15em] text-white group-hover:text-gold-300 transition-colors duration-700">
                HEAVY-PRO
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold-400/60 font-light mt-0.5">
                Lead Generation
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {["หน้าแรก", "บริการของเรา", "ประเภทรถ", "ติดต่อเรา"].map((item, idx) => {
              const href = ["#hero", "#services", "#projects", "#contact"][idx];
              return (
                <a key={item} href={href} className="text-sm font-light text-cream-100/60 hover:text-gold-300 transition-colors duration-500 relative group tracking-wider">
                  {item}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-500 group-hover:w-full ease-out"></span>
                </a>
              );
            })}
            <a href="#contact" className="relative group overflow-hidden rounded-full p-[1px] transition-all duration-700">
              <span className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></span>
              <div className="relative bg-black-950/90 backdrop-blur-md px-8 py-3 rounded-full flex items-center gap-2 group-hover:bg-black-950/40 transition-colors duration-700">
                <span className="text-sm font-medium tracking-widest text-gold-300 group-hover:text-white transition-colors duration-700">เริ่มหาลูกค้า</span>
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
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: cinematicEase }}
              className="absolute top-full left-0 w-full glass border-t border-white/5 py-8 px-6 flex flex-col gap-6 lg:hidden"
            >
              {["หน้าแรก", "บริการของเรา", "ประเภทรถ", "ติดต่อเรา"].map((item, idx) => {
                const href = ["#hero", "#services", "#projects", "#contact"][idx];
                return (
                  <a key={item} href={href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-light tracking-wider text-cream-100 border-b border-white/5 pb-3">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black-950/70 via-black-950/80 to-black-950 z-10"></div>
          <Image src={heroBg} alt="Heavy Machinery Excavator" fill className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%]" priority />
          {/* Animated Orbs */}
          <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-600/15 rounded-full blur-[150px]" />
          <motion.div animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold-400/10 rounded-full blur-[150px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: cinematicEase }} className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold-400/20 bg-black-900/50 backdrop-blur-md">
            <TrendingUp size={14} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-medium tracking-[0.3em] uppercase">Turnkey Client System</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3, ease: cinematicEase }} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            ระบบหาลูกค้าสำเร็จรูป <br/>
            <span className="text-gradient-gold italic pr-4">สำหรับคนทำรถแม็คโคร</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.6, ease: cinematicEase }} className="mt-10 text-lg md:text-xl text-cream-200/50 max-w-2xl font-light leading-relaxed tracking-wide">
            เพิ่มยอดจองคิวงาน ไม่ต้องง้อหน้านาย ไม่ต้องตัดราคาแข่งกับใคร <br className="hidden md:block"/>
            ด้วยระบบการตลาดออนไลน์ที่ <span className="text-gold-400 font-medium">ออกแบบมาเพื่อรถรับจ้างรายย่อยโดยเฉพาะ</span>
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1, ease: cinematicEase }} className="mt-14">
            <a href="#contact" className="group relative px-10 py-5 rounded-full overflow-hidden bg-transparent border border-gold-400/50 text-gold-300 font-medium text-sm tracking-[0.2em] uppercase transition-all duration-700 hover:border-gold-300 hover:text-black-950 inline-flex items-center justify-center">
              <span className="absolute inset-0 bg-gold-400 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]"></span>
              <span className="relative flex items-center gap-3">รับคำปรึกษาฟรี <ArrowUpRight size={18} className="transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold-400/40">Scroll</span>
          <motion.div animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="relative w-[1px] h-16 bg-white/5 overflow-hidden">
            <motion.div className="absolute w-full bg-gold-400/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-40 relative z-10 bg-black-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-24 items-center">
            
            {/* Image Box */}
            <motion.div variants={slowReveal} className="relative">
              <div className="absolute -inset-6 border border-gold-500/10 rounded-2xl transform rotate-2 transition-all duration-1000 ease-out hover:rotate-0 hover:border-gold-500/30"></div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3">
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image src={aboutImg} alt="Dump Truck Operation" fill className="object-cover opacity-70 mix-blend-luminosity grayscale-[10%] transition-transform duration-1000 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeUpCinematic} className="flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <span className="w-16 h-[1px] bg-gold-500/50"></span>
                <span className="text-xs font-medium text-gold-400 uppercase tracking-[0.3em]">ปัญหาที่คุณเจอ</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                เหนื่อยไหมกับ <br/>
                <span className="text-gradient-gold">การรอคอยงาน</span> แบบไร้จุดหมาย?
              </h2>
              <p className="text-cream-100/40 font-light leading-relaxed text-lg tracking-wide">
                <strong className="text-gold-400 font-medium">HEAVY-PRO</strong> เข้าใจคนทำรถรับจ้างรายย่อย เราคือระบบที่จะช่วยป้อนงานให้คุณโดยตรง เปลี่ยนจากผู้ตาม เป็นผู้เลือกงานที่คุณต้องการ
              </p>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mt-6">
                {[
                  { icon: Search, title: "เลิกพึ่งพานายหน้า", desc: "รับงานตรงจากผู้รับเหมาและเจ้าของที่ดิน ไม่ต้องโดนหักหัวคิว" },
                  { icon: TrendingUp, title: "ไม่ต้องตัดราคาสู้", desc: "สร้างความน่าเชื่อถือให้ธุรกิจคุณ ลูกค้าพร้อมจ่ายในราคาที่เป็นธรรม" },
                  { icon: Smartphone, title: "ลูกค้ารอใน LINE", desc: "ระบบดึงลูกค้าให้ทักเข้ามาสอบถามคุณเองผ่านมือถือ" },
                  { icon: Truck, title: "ขยายคิวงานเต็มเดือน", desc: "มีงานต่อเนื่อง เครื่องจักรไม่ต้องจอดทิ้งให้เสื่อมสภาพ" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="p-3.5 rounded-full bg-black-800 border border-gold-500/10 text-gold-400 transition-all duration-700 group-hover:bg-gold-500 group-hover:text-black-950 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      <item.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-cream-50 text-sm mb-2 tracking-wide">{item.title}</h4>
                      <p className="text-xs text-cream-100/30 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-40 relative bg-black-900 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: cinematicEase }} viewport={{ once: true }} className="text-center mb-24 flex flex-col items-center">
            <span className="text-xs font-medium text-gold-400 uppercase tracking-[0.3em] mb-6">บริการระบบของเรา</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">การตลาด <span className="text-gradient-gold">ครบวงจร</span></h2>
            <p className="text-cream-100/40 max-w-2xl font-light tracking-wide leading-relaxed">เปลี่ยนเครื่องจักรให้เป็นเครื่องผลิตเงิน ด้วย 3 ระบบหลักที่เราเซ็ตอัพให้คุณทั้งหมด</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "1. โปรไฟล์ธุรกิจออนไลน์", desc: "สร้างเว็บไซต์และหน้าโปรไฟล์ที่ดูเป็นมืออาชีพ เพื่อให้ผู้รับเหมาค้นหาคุณเจอเมื่อต้องการเช่ารถในพื้นที่ของคุณ" },
              { icon: Megaphone, title: "2. ยิงโฆษณาเจาะจงพื้นที่", desc: "ระบบ AI ยิงโฆษณา Facebook และ Google ตรงกลุ่มเป้าหมาย (เจ้าของที่, ผู้รับเหมา) เฉพาะในจังหวัดที่คุณรับงาน" },
              { icon: Smartphone, title: "3. ระบบปิดการขาย LINE OA", desc: "ติดตั้งระบบรับลูกค้าอัตโนมัติผ่าน LINE พร้อมข้อความตอบกลับ ให้คุณคุยงาน ตีราคา และรับจองคิวได้ทันที" }
            ].map((srv, i) => (
              <motion.div key={i} variants={fadeUpCinematic} className="glass-card p-12 rounded-[2rem] group transition-all duration-1000 relative overflow-hidden flex flex-col hover:-translate-y-2">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-10">
                  <srv.icon size={140} strokeWidth={1} />
                </div>
                <div className="mb-10 p-4 rounded-full bg-black-800 border border-gold-500/20 text-gold-400 w-fit transition-all duration-700 group-hover:bg-gold-400 group-hover:text-black-950">
                  <srv.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium mb-5 font-serif tracking-wide">{srv.title}</h3>
                <p className="text-cream-100/40 font-light text-sm leading-loose flex-grow">{srv.desc}</p>
                <div className="mt-8 flex items-center gap-3 text-gold-400 text-xs font-medium tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  <span>รายละเอียด</span> <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Supported Vehicles Section */}
      <section id="projects" className="py-40 relative bg-black-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="text-xs font-medium text-gold-400 uppercase tracking-[0.3em] mb-6 block">ประเภทรถที่รองรับ</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold">รับหาลูกค้า <span className="text-gradient-gold">ทุกประเภท</span></h2>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {partnerTypes.map((partner) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: cinematicEase }} key={partner.name} className="h-32 glass-card border border-white/5 rounded-2xl flex items-center justify-center p-6 transition-all duration-700 hover:border-gold-500/30 hover:bg-black-800/50 group">
                  <span className="font-serif font-medium text-xs uppercase tracking-[0.1em] text-cream-100/40 group-hover:text-gold-400 transition-colors duration-700 text-center leading-relaxed">{partner.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="py-40 relative bg-black-900 border-t border-white/5 overflow-hidden">
        {/* Cinematic Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-600/5 rounded-full blur-[200px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24">
            
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: cinematicEase }} viewport={{ once: true }} className="flex flex-col gap-12">
              <div>
                <span className="text-xs font-medium text-gold-400 uppercase tracking-[0.3em] mb-6 block">เริ่มรับงาน</span>
                <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">ลงทะเบียน <br/><span className="text-gradient-gold">รับสิทธิ์ใช้งานระบบ</span></h2>
                <p className="text-cream-100/40 font-light leading-relaxed tracking-wide max-w-md">
                  กรอกข้อมูลรถและพื้นที่ที่คุณรับงาน เพื่อให้ทีมงาน HEAVY-PRO ประเมินและติดต่อกลับให้คำปรึกษา ฟรี!
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {[
                  { icon: Phone, text: "09X-XXX-XXXX", label: "ติดต่อทีมงาน" },
                  { icon: MapPin, text: "รับทำระบบทั่วประเทศไทย", label: "พื้นที่ให้บริการ" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-black-800 border border-gold-500/10 flex items-center justify-center text-gold-400 transition-all duration-700 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                      <item.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] text-cream-100/30 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="font-medium text-cream-50 tracking-wide transition-colors duration-700 group-hover:text-gold-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: cinematicEase }} viewport={{ once: true }}>
              <div className="glass-card p-12 rounded-[2rem] relative overflow-hidden border border-gold-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]"></div>
                
                {contactSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: cinematicEase }} className="text-center py-20 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto mb-8 border border-gold-500/30">
                      <CheckCircle size={40} strokeWidth={1} />
                    </div>
                    <h3 className="text-3xl font-serif font-medium mb-4 tracking-wide text-gold-300">ได้รับข้อมูลแล้ว</h3>
                    <p className="text-cream-100/40 font-light text-sm leading-relaxed max-w-sm mx-auto">ทีมงานจะประเมินความเป็นไปได้ในพื้นที่ของคุณและติดต่อกลับโดยเร็วที่สุด</p>
                  </motion.div>
                ) : (
                  <form name="lead-generation" method="POST" data-netlify="true" onSubmit={handleContactSubmit} className="flex flex-col gap-6 relative z-10">
                    <input type="hidden" name="form-name" value="lead-generation" />
                    <div>
                      <label className="text-[10px] font-medium text-gold-400/80 uppercase tracking-[0.2em] mb-3 block">ชื่อผู้ติดต่อ</label>
                      <input type="text" name="name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="form-input" placeholder="ใส่ชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-gold-400/80 uppercase tracking-[0.2em] mb-3 block">เบอร์โทรศัพท์</label>
                      <input type="tel" name="phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} required className="form-input" placeholder="08X-XXX-XXXX" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-medium text-gold-400/80 uppercase tracking-[0.2em] mb-3 block">จำนวนรถที่มี (คัน)</label>
                        <input type="number" name="trucks" min="1" value={contactForm.trucks} onChange={(e) => setContactForm({...contactForm, trucks: e.target.value})} required className="form-input" placeholder="เช่น 2" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-gold-400/80 uppercase tracking-[0.2em] mb-3 block">จังหวัดที่รับงานหลัก</label>
                        <input type="text" name="service-area" value={contactForm["service-area"]} onChange={(e) => setContactForm({...contactForm, "service-area": e.target.value})} required className="form-input" placeholder="เช่น กรุงเทพ, ชลบุรี" />
                      </div>
                    </div>
                    <button type="submit" disabled={contactLoading} className="mt-6 w-full bg-gold-500 hover:bg-gold-400 text-black-950 font-bold py-5 rounded-xl transition-all duration-700 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs">
                      {contactLoading ? "กำลังส่งข้อมูล..." : <>ขอรับคำปรึกษาฟรี <ArrowUpRight size={16} /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-10 bg-black-950 border-t border-white/5 text-center relative z-10">
        <p className="text-[9px] font-light text-cream-100/20 tracking-[0.4em] uppercase">
          &copy; {new Date().getFullYear()} HEAVY-PRO. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
