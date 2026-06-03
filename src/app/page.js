"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, CheckCircle, 
  MapPin, Phone, Clock, ShieldCheck, 
  ChevronRight, ArrowUpRight, 
  Truck, HardHat, Calendar, Check, ThumbsUp
} from "lucide-react";
import Image from "next/image";

// Local Assets
const heroBg = "/assets/hero_excavator.png";
const aboutImg = "/assets/about_construction.png";
const excImg = "/assets/equipment_excavator.png";
const dumpImg = "/assets/equipment_dump_truck.png";

const equipmentList = [
  { 
    name: "รถแบคโฮ PC30 / PC120", 
    desc: "เหมาะสำหรับงานทุกสเกล ตั้งแต่ขุดบ่อทำสวนข้างบ้าน เข้าซอยแคบ (PC30) ไปจนถึงงานเคลียร์ริ่งพื้นที่ขนาดใหญ่ (PC120)",
    img: excImg,
    specs: ["เข้าซอยแคบได้สบาย", "คนขับคุยง่าย เป็นกันเอง", "ทำงานระมัดระวังทรัพย์สิน"]
  }, 
  { 
    name: "รถดัมพ์ 6 ล้อ / 10 ล้อ", 
    desc: "รับจ้างขนย้ายดิน หิน ทราย ขยะก่อสร้าง พร้อมรับเหมาถมที่ดิน งานเล็กงานใหญ่เราประเมินราคาให้ฟรีตามจริง",
    img: dumpImg,
    specs: ["รับงานตั้งแต่ 1 เที่ยวขึ้นไป", "กะทัดรัด เข้าหมู่บ้านได้", "ราคาเป็นธรรม ไม่บวกเพิ่ม"]
  }
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

  const cinematicEase = [0.22, 1, 0.36, 1];
  const fadeUp = { 
    hidden: { opacity: 0, y: 30 }, 
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: cinematicEase } } 
  };

  return (
    <div className="relative min-h-screen text-slate-50 font-sans selection:bg-yellow-500 selection:text-slate-950 overflow-hidden bg-slate-950">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4 group">
            <div className="relative h-14 w-48 md:h-20 md:w-64 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="Makro-Click Logo" fill className="object-contain object-left" priority />
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {["หน้าแรก", "บริการของเรา", "รถที่ให้บริการ", "ติดต่อประเมินราคา"].map((item, idx) => {
              const href = ["#hero", "#services", "#equipment", "#contact"][idx];
              return (
                <a key={item} href={href} className="text-[15px] font-medium text-slate-300 hover:text-yellow-500 transition-colors duration-300">
                  {item}
                </a>
              );
            })}
            <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-3 font-bold rounded-full transition-colors shadow-md flex items-center gap-2">
              <span>โทรปรึกษาฟรี</span> <ArrowUpRight size={18} />
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2 z-50 relative">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src={heroBg} alt="Heavy Machinery Excavator Working" fill className="object-cover opacity-50 mix-blend-luminosity grayscale-[20%]" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center mt-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: cinematicEase }}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-yellow-500/30 text-yellow-500 text-sm font-semibold rounded-full bg-slate-950/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> รับเหมาพื้นที่ กรุงเทพฯ และ ปริมณฑล
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-white mb-6 tracking-tight drop-shadow-lg">
              บริการให้เช่ารถ<span className="text-yellow-500">แม็คโคร</span> <br/>
              และรถดัมพ์ <span className="text-yellow-500">ราคาเป็นกันเอง</span>
            </h1>

            <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
              Makro-Click รับงานทุกขนาด งานเล็กขุดบ่อบ้านเดี่ยว งานใหญ่เคลียร์ริ่งโครงการ เราพร้อมลุย 
              คุยง่าย ทำงานไว คนขับมีประสบการณ์และระมัดระวังทรัพย์สิน ยินดีประเมินหน้างานฟรี!
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-lg group">
                <span className="flex items-center gap-2">ประเมินราคาฟรี <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
              </a>
              <div className="flex items-center gap-3 ml-2">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><ThumbsUp size={16} className="text-yellow-500"/></div>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><Check size={16} className="text-yellow-500"/></div>
                </div>
                <div className="text-xs text-slate-400">
                  <span className="text-white font-medium block">รับประกัน</span> ความพึงพอใจ
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. About / Why Choose Us */}
      <section id="services" className="py-24 relative bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <Image src={aboutImg} alt="Construction Site with Excavator" fill className="object-cover" />
              <div className="absolute inset-0 bg-slate-950/10 mix-blend-multiply"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex items-center justify-between">
                <div>
                  <p className="text-yellow-500 font-bold text-xl">บริการทุกระดับ</p>
                  <p className="text-sm text-slate-300 mt-1">ประทับใจแน่นอน</p>
                </div>
                <HardHat size={32} strokeWidth={1.5} className="text-yellow-500" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-yellow-500 text-sm font-semibold tracking-wide">ทำไมลูกค้าถึงเลือกเรา</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
                งานเล็ก งานใหญ่ <br/><span className="text-yellow-500">เราใส่ใจเท่ากัน</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg mb-4 font-light">
                ไม่ต้องกลัวว่าจะจ้างยาก Makro-Click พร้อมให้บริการลูกค้ารายย่อยและผู้รับเหมาทุกท่าน ด้วยความเป็นกันเองและซื่อสัตย์ในวิชาชีพ
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mt-4">
                {[
                  { icon: Phone, title: "คุยง่าย ให้คำปรึกษาฟรี", desc: "โทรมาปรึกษาขนาดรถหรือประเมินราคาก่อนได้ เรายินดีแนะนำ" },
                  { icon: ShieldCheck, title: "ทำงานระมัดระวัง", desc: "คนขับมีประสบการณ์ ใส่ใจพื้นที่รอบข้าง ไม่ให้บ้านช้ำ" },
                  { icon: Truck, title: "รถสภาพดี พร้อมลุย", desc: "รถใหม่เช็คระยะตลอด ป้องกันปัญหารถเสียกลางทาง" },
                  { icon: CheckCircle, title: "ราคาเป็นมิตร", desc: "ตกลงราคาชัดเจนก่อนเริ่มงาน ไม่มีบวกเพิ่มจุกจิก" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-yellow-500 mt-1">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Equipment List (Friendly Image Cards) */}
      <section id="equipment" className="py-24 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-sm font-semibold tracking-wide block mb-4">บริการเครื่องจักรของเรา</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">เลือกเครื่องจักรที่<span className="text-yellow-500">เหมาะกับงานคุณ</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">มีให้เช่าทั้งแบบรายวันและรายเดือน (มีราคาพิเศษ) พร้อมคนขับใจดี ทำงานเก่ง</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {equipmentList.map((equip, i) => (
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} key={i} className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-yellow-500/50 transition-colors duration-300">
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <Image src={equip.img} alt={equip.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                </div>
                <div className="p-8 md:p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{equip.name}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-6 flex-grow text-sm md:text-base">{equip.desc}</p>
                  
                  <div className="space-y-3 mb-8">
                    {equip.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                        <Check size={16} className="text-yellow-500" /> {spec}
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="w-full text-center bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-white font-semibold rounded-full py-4 transition-all duration-300 shadow-md">
                    ติดต่อสอบถามราคาคันนี้
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact / Booking Form */}
      <section id="contact" className="py-24 relative bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="sticky top-32">
              <span className="text-yellow-500 text-sm font-semibold tracking-wide block mb-4">ติดต่อเราง่ายๆ</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ให้เราช่วยประเมินราคา <br/><span className="text-yellow-500">ให้คุณฟรี!</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10 max-w-md font-light text-lg">
                ไม่ต้องเกรงใจครับ ไม่เช่าไม่เป็นไร ทิ้งเบอร์และรายละเอียดงานไว้ให้เราช่วยแนะนำรถที่เหมาะสมและประหยัดงบที่สุดให้ได้ครับ
              </p>

              <div className="flex flex-col gap-6 p-8 border border-slate-800 bg-slate-800/30 rounded-3xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-slate-950 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-light mb-1">โทรปรึกษาด่วน</p>
                    <p className="font-bold text-white text-xl">09X-XXX-XXXX</p>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-700/50"></div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-slate-950 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-light mb-1">พื้นที่ให้บริการ</p>
                    <p className="font-medium text-white text-lg">กรุงเทพมหานคร และ ปริมณฑล</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-slate-950 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                
                {contactSuccess ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">ได้รับข้อมูลเรียบร้อยครับ</h3>
                    <p className="text-slate-400 font-light leading-relaxed">ทีมงาน Makro-Click จะรีบติดต่อกลับไปให้คำปรึกษาและแจ้งราคาโดยเร็วที่สุดครับ ขอบพระคุณที่ไว้วางใจครับ</p>
                  </motion.div>
                ) : (
                  <form name="equipment-rental" method="POST" data-netlify="true" onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                    <input type="hidden" name="form-name" value="equipment-rental" />
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">ชื่อผู้ติดต่อ</label>
                        <input type="text" name="name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="form-input" placeholder="ชื่อ หรือ นามสกุล" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">เบอร์โทรศัพท์</label>
                        <input type="tel" name="phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} required className="form-input" placeholder="08X-XXX-XXXX" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">ประเภทเครื่องจักรที่สนใจ</label>
                      <select name="machine-type" value={contactForm["machine-type"]} onChange={(e) => setContactForm({...contactForm, "machine-type": e.target.value})} required className="form-input cursor-pointer appearance-none">
                        <option value="" disabled>-- เลือกประเภทรถที่ให้เราช่วยประเมิน --</option>
                        <option value="รถแบคโฮ PC30 (เข้าซอยแคบ)">รถแบคโฮ PC30 (เข้าซอยแคบได้)</option>
                        <option value="รถแบคโฮ PC120 (งานใหญ่)">รถแบคโฮ PC120 (เคลียร์ริ่งพื้นที่)</option>
                        <option value="รถดัมพ์ 6 ล้อ">รถดัมพ์ 6 ล้อ</option>
                        <option value="รถดัมพ์ 10 ล้อ">รถดัมพ์ 10 ล้อ</option>
                        <option value="ยังไม่แน่ใจ (ขอปรึกษาก่อน)">ยังไม่แน่ใจ ขอปรึกษาช่างก่อน</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">สถานที่หน้างาน (เขต/จังหวัด)</label>
                      <input type="text" name="job-location" value={contactForm["job-location"]} onChange={(e) => setContactForm({...contactForm, "job-location": e.target.value})} required className="form-input" placeholder="เช่น ซอยลาดพร้าว 71 กรุงเทพฯ" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2"><Calendar size={16}/> คาดว่าจะเริ่มงานวันที่</label>
                      <input type="date" name="date-needed" value={contactForm["date-needed"]} onChange={(e) => setContactForm({...contactForm, "date-needed": e.target.value})} required className="form-input style-date" />
                    </div>

                    <button type="submit" disabled={contactLoading} className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-lg">
                      {contactLoading ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลเพื่อประเมินราคาฟรี"}
                    </button>
                    <p className="text-center text-xs text-slate-500 font-light mt-1">
                      (ไม่มีข้อผูกมัดใดๆ ส่งข้อมูลเพื่อสอบถามก่อนได้ครับ)
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="relative h-14 w-48 mb-6">
                <Image src="/logo.png" alt="Makro-Click Logo" fill className="object-contain object-left opacity-80" />
              </div>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                Makro-Click ศูนย์รวมบริการให้เช่ารถแม็คโครและรถดัมพ์ รับงานทุกขนาด บริการประทับใจ ราคาเป็นกันเอง พร้อมดูแลรับใช้ผู้รับเหมาและลูกค้ารายย่อยทุกท่าน
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">บริการของเรา</h4>
              <ul className="space-y-3 text-slate-400 text-sm font-light">
                <li><a href="#equipment" className="hover:text-yellow-500 transition-colors">เช่ารถแบคโฮ PC30 / PC120</a></li>
                <li><a href="#equipment" className="hover:text-yellow-500 transition-colors">เช่ารถดัมพ์ 6 ล้อ / 10 ล้อ</a></li>
                <li><a href="#equipment" className="hover:text-yellow-500 transition-colors">รับเหมาถมดิน เคลียร์ริ่งพื้นที่</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">ติดต่อเรา</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-light">
                <li className="flex items-center gap-3"><Phone size={16} className="text-yellow-500"/> 09X-XXX-XXXX</li>
                <li className="flex items-center gap-3"><MapPin size={16} className="text-yellow-500"/> ให้บริการในเขตกรุงเทพฯ และปริมณฑล</li>
                <li className="flex items-center gap-3"><Clock size={16} className="text-yellow-500"/> เปิดให้บริการทุกวัน 24 ชั่วโมง</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-light">
              &copy; {new Date().getFullYear()} MAKRO-CLICK. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <a href="#" className="hover:text-yellow-500 transition-colors">นโยบายความเป็นส่วนตัว</a>
              <span>|</span>
              <a href="#" className="hover:text-yellow-500 transition-colors">ข้อตกลงและเงื่อนไข</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
