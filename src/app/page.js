"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Phone, MapPin, Mail, CheckCircle, 
  Home, Key, ShieldCheck, Award, FileText, 
  ChevronRight, ExternalLink, ArrowUpRight, MessageSquare, 
  Briefcase, Sparkles, Building, UserCheck
} from "lucide-react";

// TODO: ใส่โลโก้จริงที่ path นี้ - /public/logo.png
const logoPlaceholder = "/logo.png"; 

// รายชื่อแบรนด์โครงการพาร์ทเนอร์แยกหมวดหมู่
const partnerCondos = [
  { name: "RICHY" },
  { name: "REAL ASSET CONDO" }
];

const partnerHouses = [
  { name: "RUNGKIJ" },
  { name: "BRITANIA" },
  { name: "CHEWATHAI" },
  { name: "THE URBAN PROPERTY" },
  { name: "NAKHONTHONG GROUP" },
  { name: "AKRA LAND & HOUSE" },
  { name: "REVO ESTATE" },
  { name: "NC GROUP" },
  { name: "YOUR CORPORATION" },
  { name: "REAL ASSET" },
  { name: "PIEAMSUK PROPERTY" },
  { name: "LPN Development" },
  { name: "AESTIMA ASSET" }
];

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State สำหรับแท็บโครงการพาร์ทเนอร์
  const [activeTab, setActiveTab] = useState("all"); // all, condo, house

  // State สำหรับฟอร์ม
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", "email-tel": "", message: "" });
  const [contactErrors, setContactErrors] = useState({});

  const [careerSuccess, setCareerSuccess] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);
  const [careerForm, setCareerForm] = useState({
    name: "",
    email: "",
    tel: "",
    position: "credit-consultant",
    experience: "",
    resume: null,
    message: ""
  });
  const [careerErrors, setCareerErrors] = useState({});

  // ตรวจจับการ Scroll เพื่อเปลี่ยนสี Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ฟังก์ชันช่วยเหลือสำหรับ Netlify Form Submission
  const encode = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };

  // ตรวจสอบความถูกต้องและส่งฟอร์มติดต่อ
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactForm.name.trim()) errors.name = "กรุณากรอกชื่อของคุณ";
    if (!contactForm["email-tel"].trim()) errors["email-tel"] = "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์";
    if (!contactForm.message.trim()) errors.message = "กรุณากรอกข้อความ";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setContactErrors({});
    setContactLoading(true);

    try {
      // ส่งข้อมูลไปยัง Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        body: encode({ "form-name": "contact", ...contactForm }),
      });
      if (response.ok) {
        setContactSuccess(true);
        setContactForm({ name: "", "email-tel": "", message: "" });
      } else {
        alert("มีข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error(error);
      alert("มีข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setContactLoading(false);
    }
  };

  // ตรวจสอบความถูกต้องและส่งฟอร์มสมัครงาน
  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!careerForm.name.trim()) errors.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!careerForm.email.trim()) errors.email = "กรุณากรอกอีเมล";
    if (!careerForm.tel.trim()) errors.tel = "กรุณากรอกเบอร์โทรศัพท์";
    if (!careerForm.experience.trim()) errors.experience = "กรุณากรอกประสบการณ์การทำงาน";
    if (!careerForm.resume) errors.resume = "กรุณาแนบไฟล์ Resume (PDF)";

    if (Object.keys(errors).length > 0) {
      setCareerErrors(errors);
      return;
    }
    setCareerErrors({});
    setCareerLoading(true);

    try {
      // ส่งข้อมูลแบบ multipart/form-data
      const response = await fetch("/", {
        method: "POST",
        body: encode({ "form-name": "job-application", ...careerForm }),
      });
      if (response.ok) {
        setCareerSuccess(true);
        setCareerForm({
          name: "",
          email: "",
          tel: "",
          position: "credit-consultant",
          experience: "",
          resume: null,
          message: ""
        });
      } else {
        alert("มีข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error(error);
      alert("มีข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setCareerLoading(false);
    }
  };

  // กรองโครงการพาร์ทเนอร์
  const filteredPartners = () => {
    if (activeTab === "condo") return partnerCondos;
    if (activeTab === "house") return partnerHouses;
    return [...partnerCondos, ...partnerHouses];
  };

  return (
    <div className="relative min-h-screen bg-cream-50 text-navy-950 font-sans selection:bg-gold-300 selection:text-navy-950">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-navy-950/95 backdrop-blur-md py-4 shadow-lg border-b border-gold-500/20" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            {/* TODO: ใส่โลโก้จริงที่นี่ - /public/logo.png */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 flex items-center justify-center shadow-md shadow-gold-500/30">
              <span className="font-serif font-bold text-navy-950 text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors">
                THE GOLDEN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-cream-100 font-light -mt-1">
                DEVELOPMENT
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            <a href="#hero" className="text-cream-100 hover:text-gold-400 transition-colors text-sm py-2">หน้าแรก</a>
            <a href="#services" className="text-cream-100 hover:text-gold-400 transition-colors text-sm py-2">บริการ</a>
            <a href="#projects" className="text-cream-100 hover:text-gold-400 transition-colors text-sm py-2">โครงการพาร์ทเนอร์</a>
            <a href="#careers" className="text-cream-100 hover:text-gold-400 transition-colors text-sm py-2">สมัครงาน</a>
            <a href="#contact" className="text-cream-100 hover:text-gold-400 transition-colors text-sm py-2">ติดต่อเรา</a>
            
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md shadow-gold-500/20 hover:shadow-gold-400/40 hover:-translate-y-0.5"
            >
              ปรึกษาฟรี
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-cream-100 hover:text-gold-400 p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-navy-950 border-t border-navy-900 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                <a 
                  href="#hero" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream-100 hover:text-gold-400 py-2 border-b border-navy-900 transition-colors"
                >
                  หน้าแรก
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream-100 hover:text-gold-400 py-2 border-b border-navy-900 transition-colors"
                >
                  บริการ
                </a>
                <a 
                  href="#projects" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream-100 hover:text-gold-400 py-2 border-b border-navy-900 transition-colors"
                >
                  โครงการพาร์ทเนอร์
                </a>
                <a 
                  href="#careers" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream-100 hover:text-gold-400 py-2 border-b border-navy-900 transition-colors"
                >
                  สมัครงาน
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream-100 hover:text-gold-400 py-2 border-b border-navy-900 transition-colors"
                >
                  ติดต่อเรา
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gold-500 text-navy-950 text-center py-3 rounded-xl font-bold mt-2 shadow-lg shadow-gold-500/20"
                >
                  ปรึกษาฟรี
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
        {/* Background Image Placeholder with Dark & Gold Gradients Overlay */}
        <div className="absolute inset-0 z-0">
          {/* TODO: ใส่รูปบ้าน/คอนโดสวยๆ ที่นี่ - /public/hero-bg.jpg */}
          <div className="absolute inset-0 bg-[url('/hero-bg-placeholder.jpg')] bg-cover bg-center opacity-45 mix-blend-overlay"></div>
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/40 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col items-start gap-8 mt-12">
          {/* Premium Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles size={14} className="animate-pulse" />
            Premium Real Estate Services
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-cream-50 leading-tight max-w-4xl"
          >
            เป็นเจ้าของบ้านและคอนโดในฝัน <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent drop-shadow-sm">
              ง่ายกว่าที่คิด
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-cream-200/90 max-w-2xl leading-relaxed font-light"
          >
            ที่ปรึกษาสินเชื่ออสังหาริมทรัพย์ ช่วยคุณขอสินเชื่อที่เหมาะที่สุด <br />
            <span className="font-semibold text-gold-300">ปรึกษาฟรี!</span> เริ่มต้นเส้นทางสู่การเป็นเจ้าของอสังหาฯ วันนี้
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
          >
            <a 
              href="#contact" 
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-gold-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              ปรึกษาฟรี
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="#services" 
              className="flex items-center justify-center border border-cream-300/40 hover:border-gold-400 text-cream-100 hover:text-gold-300 font-semibold px-8 py-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm"
            >
              ดูบริการทั้งหมด
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ca9e5a_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Image & Decorative element */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-gold-400"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-gold-400"></div>
              {/* TODO: ใส่ภาพทีมงานหรืออาคารสวยๆ - /public/about-building.jpg */}
              <div className="aspect-[4/5] bg-[url('/about-placeholder.jpg')] bg-cover bg-center rounded-2xl shadow-2xl relative overflow-hidden bg-navy-900/10">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                  <p className="font-serif text-lg text-gold-400 font-medium">THE GOLDEN DEVELOPMENT</p>
                  <p className="text-xs font-light text-cream-200">Your Trusted Credit Partner</p>
                </div>
              </div>
            </div>

            {/* Right side: Information */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-500"></span>
                <span className="text-sm font-semibold text-gold-600 uppercase tracking-widest">เกี่ยวกับเรา</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-950 leading-tight">
                พาร์ทเนอร์ที่จะเปลี่ยนการซื้อบ้านในฝัน <br />
                <span className="text-gold-600">ให้เป็นเรื่องง่ายและคุ้มค่าที่สุด</span>
              </h2>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong>THE GOLDEN DEVELOPMENT</strong> เราคือที่ปรึกษาสินเชื่อและบริการอสังหาริมทรัพย์ระดับมืออาชีพ 
                เราไม่ใช่เจ้าของโครงการอสังหาริมทรัพย์ แต่เราทำหน้าที่เป็นเสมือนคนกลางและที่ปรึกษาส่วนตัวคอยเคียงข้างคุณ 
                เพื่อช่วยอำนวยความสะดวกในเรื่องการจัดเตรียมเอกสาร วางแผนทางการเงิน และประสานงานขอยื่นสินเชื่อบ้านและคอนโดที่เหมาะสม 
                ตอบโจทย์ความสามารถทางการเงินของคุณมากที่สุดอย่างแท้จริง
              </p>

              {/* Features grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                
                {/* Feature 1 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-cream-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 rounded-lg bg-gold-50 text-gold-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 mb-1">ให้คำปรึกษาฟรี</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      ไม่มีค่าใช้จ่ายแอบแฝงในการประเมินวงเงินและขอคำแนะนำเบื้องต้น
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-cream-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 rounded-lg bg-gold-50 text-gold-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 mb-1">พันธมิตรธนาคารชั้นนำ</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      มีคอนเนคชั่นหลากหลายเพื่อเปรียบเทียบอัตราดอกเบี้ยและโปรโมชันที่ดีที่สุด
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-cream-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 rounded-lg bg-gold-50 text-gold-600">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 mb-1">ดูแลแบบครบวงจร</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      ตั้งแต่การเตรียมยื่นเอกสาร การตรวจดีเฟค จนถึงกระบวนการโอนกรรมสิทธิ์
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-cream-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 rounded-lg bg-gold-50 text-gold-600">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 mb-1">เลือกโครงการที่หลากหลาย</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      ร่วมมือกับแบรนด์อสังหาฯ และโครงการพาร์ทเนอร์ยอดนิยมมากมาย
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24 md:py-32 bg-navy-950 text-cream-50 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center flex flex-col items-center gap-4 mb-20">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span>
              <span className="text-sm font-semibold text-gold-400 uppercase tracking-widest">บริการของเรา</span>
              <span className="w-8 h-[1px] bg-gold-500"></span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-cream-50">
              โซลูชันเพื่อคนอยากมีบ้านแบบครบวงจร
            </h2>
            <p className="text-cream-200/70 max-w-2xl font-light text-sm md:text-base">
              เรายกระดับบริการที่ปรึกษาสินเชื่อและบริการหลังการขาย เพื่อให้ทุกการลงทุนในอสังหาริมทรัพย์ของคุณเป็นไปอย่างราบรื่น ปลอดภัย และคุ้มค่าที่สุด
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 p-8 rounded-2xl bg-navy-900 border border-navy-800 transition-all duration-300 hover:border-gold-500/40 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 w-fit rounded-xl bg-gold-500/10 text-gold-400">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-cream-100">
                บริการให้คำปรึกษาปิดหนี้ก่อนยื่นกู้
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-grow">
                วางแผนปิดหนี้อย่างเป็นระบบ สำหรับผู้ที่มีภาระหนี้บัตรเครดิต หรือสินเชื่อส่วนบุคคลหลายบัญชี เพื่อปรับปรุงประวัติเครดิตบูโร (Credit Score) และเพิ่มขีดความสามารถการกู้บ้าน-คอนโดให้ผ่านฉลุย
              </p>
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm group-hover:text-gold-300 transition-colors mt-4">
                <span>รายละเอียดการบริการ</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 p-8 rounded-2xl bg-navy-900 border border-navy-800 transition-all duration-300 hover:border-gold-500/40 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 w-fit rounded-xl bg-gold-500/10 text-gold-400">
                <Key size={28} />
              </div>
              <h3 className="text-xl font-bold text-cream-100">
                บริการให้เช่า และเช่าซื้อ (Rent-to-own)
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-grow">
                บริการดูแลหลังการขายอย่างเป็นมืออาชีพ ช่วยจัดหาผู้เช่า หรือวางระบบเช่าซื้อบ้านและคอนโดคุณภาพ บนทำเลเด่นหลากหลายทั้งพื้นที่ในเมืองและย่านชานเมือง คัดสรรผู้เช่าที่เชื่อถือได้
              </p>
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm group-hover:text-gold-300 transition-colors mt-4">
                <span>รายละเอียดการบริการ</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex flex-col gap-6 p-8 rounded-2xl bg-navy-900 border border-navy-800 transition-all duration-300 hover:border-gold-500/40 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 w-fit rounded-xl bg-gold-500/10 text-gold-400">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-cream-100">
                บริการตรวจ Defect ก่อนรับมอบ
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-grow">
                ตรวจรับมอบอสังหาริมทรัพย์โดยวิศวกรผู้เชี่ยวชาญ ค้นหาจุดบกพร่องทั้งโครงสร้าง งานระบบไฟฟ้า น้ำประปา และพื้นผิว ป้องกันปัญหาบานปลายและต้องเสียค่าใช้จ่ายซ่อมแซมเองในภายหลัง
              </p>
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm group-hover:text-gold-300 transition-colors mt-4">
                <span>รายละเอียดการบริการ</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. โครงการพาร์ทเนอร์ Section */}
      <section id="projects" className="py-24 md:py-32 bg-cream-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-500"></span>
                <span className="text-sm font-semibold text-gold-600 uppercase tracking-widest">พันธมิตรโครงการ</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-950">
                แบรนด์และโครงการคุณภาพชั้นนำ
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 p-1.5 bg-cream-100 rounded-xl w-fit self-start md:self-auto border border-cream-200">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  activeTab === "all" 
                    ? "bg-navy-950 text-gold-400 shadow-sm" 
                    : "text-slate-600 hover:text-navy-950"
                }`}
              >
                ทั้งหมด
              </button>
              <button 
                onClick={() => setActiveTab("condo")}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  activeTab === "condo" 
                    ? "bg-navy-950 text-gold-400 shadow-sm" 
                    : "text-slate-600 hover:text-navy-950"
                }`}
              >
                หมวดคอนโด
              </button>
              <button 
                onClick={() => setActiveTab("house")}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  activeTab === "house" 
                    ? "bg-navy-950 text-gold-400 shadow-sm" 
                    : "text-slate-600 hover:text-navy-950"
                }`}
              >
                หมวดบ้าน/ทาวน์โฮม
              </button>
            </div>
          </div>

          {/* Logo Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPartners().map((partner) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={partner.name}
                  className="bg-white border border-cream-200 rounded-xl p-6 h-28 flex flex-col justify-center items-center text-center shadow-sm hover:border-gold-400 hover:shadow-md transition-all group relative overflow-hidden"
                >
                  {/* TODO: ใส่โลโก้แบรนด์พาร์ทเนอร์จริง เช่น /public/partners/richy.png */}
                  <span className="font-serif font-bold text-xs uppercase tracking-wider text-navy-800 group-hover:text-gold-600 transition-colors">
                    {partner.name}
                  </span>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
                    <Building size={12} className="text-gold-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 6. Careers (สมัครงาน) Section */}
      <section id="careers" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span>
              <span className="text-sm font-semibold text-gold-600 uppercase tracking-widest">ร่วมงานกับเรา</span>
              <span className="w-8 h-[1px] bg-gold-500"></span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-950">
              ก้าวเข้าสู่อนาคตที่สดใสไปด้วยกัน
            </h2>
            <p className="text-slate-500 max-w-xl font-light text-sm">
              เรายินดีต้อนรับผู้ที่กระตือรือร้นและต้องการพัฒนาตนเองมาร่วมสร้างผลงานระดับมืออาชีพร่วมกับเรา
            </p>
          </div>

          <div className="bg-cream-50 border border-cream-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-cream-100">
            {careerSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-bold text-navy-950 font-serif">ส่งใบสมัครสำเร็จ!</h3>
                <p className="text-slate-600 text-sm max-w-md">
                  ขอบคุณสำหรับข้อมูลใบสมัครงานของคุณ เจ้าหน้าที่ฝ่ายบุคคลของเราจะติดต่อกลับหาคุณโดยเร็วที่สุด
                </p>
                <button 
                  onClick={() => setCareerSuccess(false)}
                  className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500 underline"
                >
                  ส่งใบสมัครอื่นเพิ่มเติม
                </button>
              </motion.div>
            ) : (
              <form 
                name="job-application" 
                method="POST" 
                data-netlify="true" 
                enctype="multipart/form-data"
                onSubmit={handleCareerSubmit}
                className="flex flex-col gap-6"
              >
                {/* Hidden input สำหรับ Netlify Forms */}
                <input type="hidden" name="form-name" value="job-application" />

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* ชื่อ-นามสกุล */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name" 
                      value={careerForm.name}
                      onChange={(e) => setCareerForm({...careerForm, name: e.target.value})}
                      placeholder="สมชาย ใจดี" 
                      className={`form-input ${careerErrors.name ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {careerErrors.name && <p className="text-xs text-red-500 font-medium">{careerErrors.name}</p>}
                  </div>

                  {/* อีเมล */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">อีเมล <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      name="email" 
                      value={careerForm.email}
                      onChange={(e) => setCareerForm({...careerForm, email: e.target.value})}
                      placeholder="somchai@example.com" 
                      className={`form-input ${careerErrors.email ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {careerErrors.email && <p className="text-xs text-red-500 font-medium">{careerErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* เบอร์โทร */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="tel" 
                      value={careerForm.tel}
                      onChange={(e) => setCareerForm({...careerForm, tel: e.target.value})}
                      placeholder="0812345678" 
                      className={`form-input ${careerErrors.tel ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {careerErrors.tel && <p className="text-xs text-red-500 font-medium">{careerErrors.tel}</p>}
                  </div>

                  {/* ตำแหน่งที่สนใจ */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ตำแหน่งที่สนใจ <span className="text-red-500">*</span></label>
                    <select 
                      name="position" 
                      value={careerForm.position}
                      onChange={(e) => setCareerForm({...careerForm, position: e.target.value})}
                      className="form-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%20fill%3D%22currentColor%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10"
                    >
                      {/* TODO: แก้ไขหรือเพิ่มเติมตำแหน่งงานจริงได้ที่นี่ */}
                      <option value="credit-consultant">ที่ปรึกษาสินเชื่ออสังหาริมทรัพย์ (Credit Consultant)</option>
                      <option value="property-consultant">เจ้าหน้าที่บริหารงานเช่า/เช่าซื้อ (Property Consultant)</option>
                      <option value="defect-inspector">วิศวกร/ช่างตรวจรับมอบบ้านและคอนโด (Defect Inspector)</option>
                      <option value="marketing-admin">เจ้าหน้าที่ประสานงานการตลาดและแอดมิน (Marketing & Admin)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* ประสบการณ์ทำงาน */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ประสบการณ์ทำงาน (ปี) <span className="text-red-500">*</span></label>
                    <input 
                      type="number" 
                      name="experience" 
                      min="0"
                      value={careerForm.experience}
                      onChange={(e) => setCareerForm({...careerForm, experience: e.target.value})}
                      placeholder="เช่น 2" 
                      className={`form-input ${careerErrors.experience ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {careerErrors.experience && <p className="text-xs text-red-500 font-medium">{careerErrors.experience}</p>}
                  </div>

                  {/* แนบ Resume (PDF เท่านั้น) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">แนบ Resume (PDF) <span className="text-red-500">*</span></label>
                    <input 
                      type="file" 
                      name="resume" 
                      accept=".pdf"
                      onChange={(e) => setCareerForm({...careerForm, resume: e.target.files[0] || null})}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100 transition-colors file:cursor-pointer cursor-pointer border border-cream-200 bg-cream-50 p-1.5 rounded-lg"
                    />
                    {careerErrors.resume && <p className="text-xs text-red-500 font-medium">{careerErrors.resume}</p>}
                  </div>
                </div>

                {/* ข้อความเพิ่มเติม */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-navy-900">ข้อความเพิ่มเติม (แนะนำตัวเองเพิ่มเติม)</label>
                  <textarea 
                    name="message" 
                    rows={4}
                    value={careerForm.message}
                    onChange={(e) => setCareerForm({...careerForm, message: e.target.value})}
                    placeholder="เล่าประสบการณ์คร่าวๆ หรือระบุช่องทางการติดต่อเพิ่มเติม..."
                    className="form-input resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={careerLoading}
                  className="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 disabled:opacity-50 text-navy-950 font-bold py-4 rounded-xl shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 transition-all duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Briefcase size={18} />
                  {careerLoading ? "กำลังดำเนินการส่งใบสมัคร..." : "ส่งใบสมัครเข้าร่วมทีม"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 7. Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-cream-100 border-t border-cream-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Contact info & Maps */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-gold-500"></span>
                  <span className="text-sm font-semibold text-gold-600 uppercase tracking-widest">ติดต่อเรา</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-950">
                  ยินดีให้คำปรึกษาตลอดเวลา
                </h2>
                <p className="text-slate-600 font-light text-sm">
                  หากคุณมีข้อสงสัยเกี่ยวกับสินเชื่อ ตรวจดีเฟค หรือต้องการฝากขาย/เช่า สามารถสอบถามข้อมูลหรือนัดหมายเจ้าหน้าที่ได้ทันที
                </p>
              </div>

              {/* Info Cards */}
              <div className="flex flex-col gap-4">
                {/* Phone */}
                <div className="flex gap-4 p-5 bg-white border border-cream-200 rounded-2xl shadow-sm">
                  <div className="p-3 w-fit rounded-xl bg-gold-50 text-gold-600">
                    <Phone size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">เบอร์โทรศัพท์ติดต่อ</span>
                    <a href="tel:020777921" className="text-navy-950 font-bold hover:text-gold-600 transition-colors">020 777 921</a>
                    <a href="tel:0642539889" className="text-navy-950 font-bold hover:text-gold-600 transition-colors">06 4253 9889</a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 p-5 bg-white border border-cream-200 rounded-2xl shadow-sm">
                  <div className="p-3 w-fit rounded-xl bg-gold-50 text-gold-600">
                    <MapPin size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">ที่ตั้งสำนักงาน</span>
                    <p className="text-navy-950 font-bold text-sm leading-relaxed">
                      88/16 ซอยรามคำแหง 53 (จันทร์ศรีชวาลา) แขวงพลับพลา เขตวังทองหลาง กรุงเทพมหานคร 10310
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-cream-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.522961858548!2d100.61280367584577!3d13.762410886630449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e598debb14f%3A0xc07a44f48ff2f5d7!2zODgvMTYg4LiL4Lit4Lii4Liy4Lij4Liy4Lih4LmB4Lih4LiHIDUzIOC5geC4guC4p-C4h-C4nuC4peC4seC4nuC4p-C4sQ!5e0!3m2!1sth!2sth!4v1716382000000!5m2!1sth!2sth" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่สำนักงาน THE GOLDEN DEVELOPMENT"
                ></iframe>
              </div>

            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-6 bg-white border border-cream-200 p-8 md:p-12 rounded-3xl shadow-xl">
              
              <h3 className="font-serif text-2xl font-bold text-navy-950 mb-6">ส่งข้อความติดต่อเรา</h3>
              
              {contactSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-navy-950">ส่งข้อมูลสำเร็จ!</h4>
                  <p className="text-slate-600 text-sm max-w-sm">
                    ส่งสำเร็จ ขอบคุณสำหรับข้อมูล! เจ้าหน้าที่ที่เกี่ยวข้องของเราจะติดต่อกลับหาคุณผ่านช่องทางที่ระบุไว้โดยเร็วที่สุด
                  </p>
                  <button 
                    onClick={() => setContactSuccess(false)}
                    className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500 underline"
                  >
                    ส่งข้อความอื่นเพิ่มเติม
                  </button>
                </motion.div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleContactSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Hidden input สำหรับ Netlify Forms */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* ชื่อ */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ชื่อผู้ติดต่อ <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="ระบุชื่อของคุณ" 
                      className={`form-input bg-cream-50 ${contactErrors.name ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {contactErrors.name && <p className="text-xs text-red-500 font-medium">{contactErrors.name}</p>}
                  </div>

                  {/* อีเมล / เบอร์โทร */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ช่องทางติดต่อกลับ (อีเมล / เบอร์โทรศัพท์) <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="email-tel" 
                      value={contactForm["email-tel"]}
                      onChange={(e) => setContactForm({...contactForm, "email-tel": e.target.value})}
                      placeholder="ระบุเบอร์โทรหรืออีเมลสำหรับติดต่อกลับ" 
                      className={`form-input bg-cream-50 ${contactErrors["email-tel"] ? "border-red-400 bg-red-50/10" : ""}`}
                    />
                    {contactErrors["email-tel"] && <p className="text-xs text-red-500 font-medium">{contactErrors["email-tel"]}</p>}
                  </div>

                  {/* ข้อความ */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">ข้อความของคุณ <span className="text-red-500">*</span></label>
                    <textarea 
                      name="message" 
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="กรอกรายละเอียด หรือหัวข้อบริการที่สนใจต้องการปรึกษา..."
                      className={`form-input bg-cream-50 resize-none ${contactErrors.message ? "border-red-400 bg-red-50/10" : ""}`}
                    ></textarea>
                    {contactErrors.message && <p className="text-xs text-red-500 font-medium">{contactErrors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={contactLoading}
                    className="bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 disabled:opacity-50 text-gold-400 font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 cursor-pointer border border-gold-500/20"
                  >
                    <MessageSquare size={18} />
                    {contactLoading ? "กำลังส่งข้อมูล..." : "ส่งข้อความเพื่อติดต่อกลับ"}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="bg-navy-950 text-cream-100 py-16 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Logo & Tagline */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <a href="#hero" className="flex items-center gap-3 w-fit">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 flex items-center justify-center shadow-md">
                  <span className="font-serif font-bold text-navy-950 text-xl">G</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-gold-400">
                    THE GOLDEN
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-cream-200/60 font-light -mt-1">
                    DEVELOPMENT
                  </span>
                </div>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
                ผู้ช่วยและที่ปรึกษาสินเชื่ออสังหาริมทรัพย์ส่วนตัวของคุณ คัดสรรดีลการกู้บ้านและคอนโดที่เหมาะสม ดูแลประทับใจตั้งแต่เริ่มต้นจนถึงวันส่งมอบกรรมสิทธิ์
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <h4 className="font-serif text-sm font-bold text-gold-400 tracking-wider">ลิงก์ด่วน</h4>
              <div className="flex flex-col gap-2 text-xs font-light text-slate-400">
                <a href="#hero" className="hover:text-gold-300 transition-colors w-fit">หน้าแรก</a>
                <a href="#about" className="hover:text-gold-300 transition-colors w-fit">เกี่ยวกับเรา</a>
                <a href="#services" className="hover:text-gold-300 transition-colors w-fit">บริการของเรา</a>
                <a href="#projects" className="hover:text-gold-300 transition-colors w-fit">โครงการพาร์ทเนอร์</a>
                <a href="#careers" className="hover:text-gold-300 transition-colors w-fit">สมัครงาน</a>
                <a href="#contact" className="hover:text-gold-300 transition-colors w-fit">ติดต่อเรา</a>
              </div>
            </div>

            {/* Col 3: Social & Connect */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <h4 className="font-serif text-sm font-bold text-gold-400 tracking-wider">ติดตามเราผ่านทางโซเชียล</h4>
              <div className="flex flex-col gap-3 text-xs font-light text-slate-400">
                <a 
                  href="https://lin.ee/twmRily" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-gold-300 transition-colors w-fit group"
                >
                  <span className="p-1.5 rounded-md bg-navy-900 group-hover:bg-navy-800 text-gold-400">Line Official</span>
                  <ExternalLink size={12} />
                </a>
                <a 
                  href="https://www.facebook.com/Goldpropertythailand" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-gold-300 transition-colors w-fit group"
                >
                  <span className="p-1.5 rounded-md bg-navy-900 group-hover:bg-navy-800 text-gold-400">Facebook Page</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-navy-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-light">
            <span>© {new Date().getFullYear()} THE GOLDEN DEVELOPMENT. All rights reserved.</span>
            <div className="flex gap-4">
              <span>พัฒนาโดย Antigravity AI Code Assistant</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
