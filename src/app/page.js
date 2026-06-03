"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, CheckCircle, 
  MapPin, Phone, Clock, ShieldCheck, 
  ChevronRight, ArrowUpRight, 
  Truck, HardHat, Calendar
} from "lucide-react";
import Image from "next/image";

// High-quality Construction/Heavy Machinery Images (Copyright Free from Unsplash)
const heroBg = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2000";
const aboutImg = "https://images.unsplash.com/photo-1541888081622-67cc3261a877?auto=format&fit=crop&q=80&w=800";

const equipmentTypes = [
  { name: "รถแบคโฮ PC30", desc: "เหมาะสำหรับพื้นที่แคบ งานขุดท่อ" }, 
  { name: "รถแบคโฮ PC120", desc: "ขุดสระ เคลียร์ริ่งพื้นที่ขนาดใหญ่" }, 
  { name: "รถดัมพ์ 6 ล้อ", desc: "ขนย้ายดิน หิน ทราย งานทั่วไป" }, 
  { name: "รถดัมพ์ 10 ล้อ", desc: "บรรทุกหนัก งานถมที่ดิน" }, 
  { name: "รถแทรคเตอร์", desc: "ดันดิน ปรับระดับหน้าดิน" }, 
  { name: "รถเกรดเดอร์", desc: "ปาดหน้าดิน ทำถนน" }
];

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactForm, setContactForm] = useState({ name: "", phone: "", "machine-type": "", "job-location": "", "date-needed": "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

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
      await fetch("/", { method: "POST", body: encode({ "form-name": "equipment-rental", ...contactForm }) });
      setContactSuccess(true);
      setContactForm({ name: "", phone: "", "machine-type": "", "job-location": "", "date-needed": "" });
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setContactLoading(false);
    }
  };

  // Smooth Cinematic Animation variants
  const cinematicEase = [0.22, 1, 0.36, 1];
  
  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } 
  };
  
  const fadeUpCinematic = { 
    hidden: { opacity: 0, y: 40 }, 
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: cinematicEase } } 
  };

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-yellow-500 selection:text-slate-950 overflow-hidden">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "glass-nav py-4" : "bg-white/80 backdrop-blur-sm py-6 border-b border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-slate-900 shadow-md">
              <Truck size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl tracking-tight text-slate-900">
                Makro-Click
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {["หน้าแรก", "บริการของเรา", "เครื่องจักรให้เช่า", "จองคิวรถ"].map((item, idx) => {
              const href = ["#hero", "#services", "#equipment", "#contact"][idx];
              return (
                <a key={item} href={href} className="text-[15px] font-medium text-slate-600 hover:text-yellow-600 transition-colors duration-300">
                  {item}
                </a>
              );
            })}
            <a href="#contact" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2">
              <Phone size={16} /> <span>ติดต่อเรา</span>
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-slate-900 p-2 z-50 relative">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 py-6 px-6 flex flex-col gap-4 lg:hidden shadow-xl"
            >
              {["หน้าแรก", "บริการของเรา", "เครื่องจักรให้เช่า", "จองคิวรถ"].map((item, idx) => {
                const href = ["#hero", "#services", "#equipment", "#contact"][idx];
                return (
                  <a key={item} href={href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100">
                    {item}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section (SEO Optimized H1) */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src={heroBg} alt="Heavy Machinery Excavator Working" fill className="object-cover opacity-40 mix-blend-overlay" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: cinematicEase }}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold tracking-wide">
              <MapPin size={16} /> ให้บริการในเขต กรุงเทพฯ และ ปริมณฑล
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              บริการให้เช่ารถแม็คโคร <br/>
              <span className="text-yellow-500">รถดัมพ์ พร้อมคนขับ</span>
            </h1>

            <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed">
              Makro-Click ศูนย์รวมเครื่องจักรหนักให้เช่า รถสภาพใหม่ พร้อมปฏิบัติงาน 
              รับเคลียร์ริ่งพื้นที่ ถมดิน ปรับหน้าดิน ขุดฟุตติ้ง รวดเร็ว ปลอดภัย ไว้ใจได้ 100%
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] flex items-center gap-2">
                จองคิวรถด่วน <ArrowUpRight size={18} />
              </a>
              <a href="#equipment" className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl backdrop-blur-sm transition-all border border-white/10">
                ดูประเภทรถ
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. About / Why Choose Us */}
      <section id="services" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image */}
            <motion.div variants={fadeUpCinematic} className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={aboutImg} alt="Construction Site with Excavator" fill className="object-cover" />
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeUpCinematic} className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                ทำไมผู้รับเหมาถึงเลือก <span className="text-yellow-500">Makro-Click</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-4">
                เราคือผู้ให้บริการเช่าเครื่องจักรหนักที่เข้าใจคนทำงานก่อสร้างที่สุด ด้วยประสบการณ์ในวงการและจำนวนรถที่พร้อมให้บริการตลอดเวลา ทำให้งานของคุณไม่สะดุด
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                {[
                  { icon: Clock, title: "เข้างานตรงเวลา", desc: "รถพร้อมสแตนด์บาย ไม่ทิ้งงาน ไม่ทำให้โปรเจกต์ล่าช้า" },
                  { icon: ShieldCheck, title: "คนขับมืออาชีพ", desc: "พนักงานขับรถมีประสบการณ์สูง แก้ปัญหาหน้างานได้" },
                  { icon: Truck, title: "รถสภาพสมบูรณ์", desc: "ตรวจเช็คสภาพเครื่องจักรเป็นประจำ ทำงานเต็มประสิทธิภาพ" },
                  { icon: HardHat, title: "ราคามาตรฐาน", desc: "ไม่มีบวกเพิ่มหน้างาน ชัดเจน โปร่งใส คุ้มค่าที่สุด" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-yellow-600 shadow-sm">
                      <item.icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Equipment List (SEO Friendly) */}
      <section id="equipment" className="py-24 relative bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">ประเภทเครื่องจักร<span className="text-yellow-500">ให้เช่า</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">เลือกเครื่องจักรที่เหมาะกับขนาดงานของคุณ เรามีบริการให้เช่าทั้งแบบรายวันและรายเดือน</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentTypes.map((equip, i) => (
              <motion.div key={i} variants={fadeUpCinematic} className="glass-card p-8 hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-transparent hover:border-t-yellow-500">
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{equip.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{equip.desc}</p>
                <a href="#contact" className="text-slate-900 font-semibold text-sm inline-flex items-center gap-1 hover:text-yellow-600 transition-colors">
                  เช่าคันนี้ <ChevronRight size={16} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Contact / Booking Form */}
      <section id="contact" className="py-24 relative bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: cinematicEase }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
                ติดต่อจองคิวรถ <br/><span className="text-yellow-500">Makro-Click</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-10 max-w-md">
                กรอกรายละเอียดงานที่คุณต้องการ เพื่อให้ทีมงานประเมินราคาและเช็คคิวรถที่ว่างให้คุณได้ทันที ให้บริการเฉพาะในเขตกรุงเทพฯ และปริมณฑล
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-yellow-500 flex items-center justify-center border border-slate-700">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">โทรด่วน</p>
                    <p className="font-bold text-white text-xl">09X-XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-yellow-500 flex items-center justify-center border border-slate-700">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">พื้นที่ให้บริการ</p>
                    <p className="font-medium text-white">กรุงเทพมหานคร และ ปริมณฑล</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: cinematicEase }} viewport={{ once: true }}>
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                
                {contactSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">ส่งข้อมูลสำเร็จ</h3>
                    <p className="text-slate-600">ทีมงาน Makro-Click จะรีบติดต่อกลับเพื่อแจ้งคิวรถและราคาโดยเร็วที่สุดครับ</p>
                  </motion.div>
                ) : (
                  <form name="equipment-rental" method="POST" data-netlify="true" onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                    <input type="hidden" name="form-name" value="equipment-rental" />
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">ชื่อผู้ติดต่อ</label>
                        <input type="text" name="name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="form-input" placeholder="ชื่อ - นามสกุล" />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">เบอร์โทรศัพท์</label>
                        <input type="tel" name="phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} required className="form-input" placeholder="08X-XXX-XXXX" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">ประเภทเครื่องจักรที่ต้องการเช่า</label>
                      <select name="machine-type" value={contactForm["machine-type"]} onChange={(e) => setContactForm({...contactForm, "machine-type": e.target.value})} required className="form-input bg-white cursor-pointer">
                        <option value="" disabled>-- เลือกประเภทรถ --</option>
                        {equipmentTypes.map(eq => <option key={eq.name} value={eq.name}>{eq.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">สถานที่หน้างาน (เขต/จังหวัด)</label>
                      <input type="text" name="job-location" value={contactForm["job-location"]} onChange={(e) => setContactForm({...contactForm, "job-location": e.target.value})} required className="form-input" placeholder="เช่น ลาดพร้าว กรุงเทพฯ" />
                    </div>

                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Calendar size={16}/> วันที่ต้องการเริ่มงาน</label>
                      <input type="date" name="date-needed" value={contactForm["date-needed"]} onChange={(e) => setContactForm({...contactForm, "date-needed": e.target.value})} required className="form-input" />
                    </div>

                    <button type="submit" disabled={contactLoading} className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg">
                      {contactLoading ? "กำลังส่งข้อมูล..." : "ยืนยันการจองคิวรถ"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center border-t border-slate-800">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Makro-Click. ให้บริการเช่าเครื่องจักรหนัก กรุงเทพฯ ปริมณฑล.
        </p>
      </footer>
    </div>
  );
}
