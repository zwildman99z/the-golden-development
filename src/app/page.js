"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, CheckCircle, 
  MapPin, Phone, Clock, ShieldCheck, 
  ChevronRight, ArrowUpRight, 
  Truck, HardHat, Calendar, Check
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
    desc: "เหมาะสำหรับงานขุดสระ เคลียร์ริ่งพื้นที่ และงานก่อสร้างทั่วไป รองรับงานทั้งในพื้นที่แคบและพื้นที่กว้าง",
    img: excImg,
    specs: ["พนักงานขับมืออาชีพ", "เติมน้ำมันเต็มระบบ", "เช็คระยะพร้อมใช้งาน"]
  }, 
  { 
    name: "รถดัมพ์ 6 ล้อ / 10 ล้อ", 
    desc: "บริการขนย้ายดิน หิน ทราย และวัสดุก่อสร้างทุกชนิด พร้อมรับเหมาถมที่ดินทั่วกรุงเทพฯ และปริมณฑล",
    img: dumpImg,
    specs: ["กระบะใหญ่ จุเยอะ", "เครื่องยนต์กำลังสูง", "รับประกันเวลาถึงหน้างาน"]
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
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center text-slate-950 shadow-md transform skew-x-[-10deg]">
              <Truck size={22} strokeWidth={2.5} className="transform skew-x-[10deg]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl tracking-tighter uppercase text-white">
                MAKRO<span className="text-yellow-500">-CLICK</span>
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {["หน้าแรก", "มาตรฐานของเรา", "เครื่องจักรให้เช่า", "จองคิวรถ"].map((item, idx) => {
              const href = ["#hero", "#services", "#equipment", "#contact"][idx];
              return (
                <a key={item} href={href} className="text-[14px] font-semibold text-slate-300 hover:text-yellow-500 uppercase tracking-wide transition-colors duration-300">
                  {item}
                </a>
              );
            })}
            <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-2.5 font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 transform skew-x-[-10deg]">
              <span className="transform skew-x-[10deg] flex items-center gap-2">ติดต่อเรา <ArrowUpRight size={16} /></span>
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
          <Image src={heroBg} alt="Heavy Machinery Excavator Working" fill className="object-cover opacity-60 mix-blend-luminosity grayscale-[30%]" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center mt-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: cinematicEase }}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold tracking-[0.2em] uppercase bg-slate-950/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> BKK & VICINITY EQUIPMENT RENTAL
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.05] text-white mb-6 uppercase tracking-tight">
              บริการให้เช่ารถ<span className="text-yellow-500">แม็คโคร</span> <br/>
              และรถดัมพ์<span className="text-yellow-500">พร้อมคนขับ</span>
            </h1>

            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed font-light">
              Makro-Click ศูนย์รวมเครื่องจักรหนักให้เช่าระดับองค์กร รถสภาพใหม่ 100% พร้อมปฏิบัติงาน 
              รับเคลียร์ริ่งพื้นที่ ถมดิน ปรับหน้าดิน ขุดฟุตติ้ง รวดเร็ว ปลอดภัย ได้มาตรฐานสากล
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black uppercase tracking-widest px-8 py-4 transition-all flex items-center gap-2 transform skew-x-[-10deg] group">
                <span className="transform skew-x-[10deg] flex items-center gap-2">จองคิวรถด่วน <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
              </a>
              <div className="flex items-center gap-3 ml-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><Check size={16} className="text-yellow-500"/></div>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><Check size={16} className="text-yellow-500"/></div>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><Check size={16} className="text-yellow-500"/></div>
                </div>
                <div className="text-xs text-slate-400">
                  <span className="text-white font-bold block">100+</span> โปรเจกต์ที่ไว้วางใจ
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. About / Why Choose Us */}
      <section id="services" className="py-32 relative bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative aspect-square md:aspect-[4/3] overflow-hidden border border-white/10 shadow-2xl">
              <Image src={aboutImg} alt="Construction Site with Excavator" fill className="object-cover grayscale-[20%]" />
              <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md border border-white/10 p-6 flex items-center justify-between">
                <div>
                  <p className="text-yellow-500 font-bold text-3xl">24/7</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Standby Support</p>
                </div>
                <HardHat size={40} strokeWidth={1} className="text-slate-600" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-6">
              <span className="text-yellow-500 text-sm font-bold tracking-[0.2em] uppercase">ทำไมผู้รับเหมาถึงเลือกเรา</span>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight uppercase">
                มาตรฐาน <span className="text-yellow-500">ระดับองค์กร</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg mb-4 font-light">
                Makro-Click เข้าใจดีว่าเวลาในไซต์งานก่อสร้างมีค่าทุกวินาที เราจึงเตรียมความพร้อมของเครื่องจักรและพนักงานขับรถให้สมบูรณ์แบบ 100% ตลอดเวลา
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mt-4">
                {[
                  { icon: Clock, title: "เข้างานตรงเวลา", desc: "สแตนด์บายก่อนเวลา ไม่ทำให้โปรเจกต์ล่าช้า" },
                  { icon: ShieldCheck, title: "คนขับมืออาชีพ", desc: "ชำนาญการขุด เจาะ ถม แก้ปัญหาหน้างานได้" },
                  { icon: Truck, title: "รถสภาพ 100%", desc: "ตรวจเช็คระยะสม่ำเสมอ เครื่องจักรไม่เสียกลางทาง" },
                  { icon: CheckCircle, title: "ราคาโปร่งใส", desc: "ราคามาตรฐาน ชัดเจน ไม่มีบวกเพิ่มหน้างาน" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="text-yellow-500 mt-1">
                      <item.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Equipment List (Premium Image Cards) */}
      <section id="equipment" className="py-32 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-20">
            <span className="text-yellow-500 text-sm font-bold tracking-[0.2em] uppercase block mb-4">บริการเครื่องจักร</span>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-4 uppercase">เลือกเครื่องจักรที่<span className="text-yellow-500">หน้างานต้องการ</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">บริการให้เช่าเครื่องจักรหนักทั้งแบบรายวันและรายเดือน พร้อมน้ำมันและคนขับ</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {equipmentList.map((equip, i) => (
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} key={i} className="group relative bg-slate-900 border border-slate-800 overflow-hidden flex flex-col">
                <div className="relative h-72 overflow-hidden bg-slate-800">
                  <Image src={equip.img} alt={equip.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-white mb-4 tracking-wide uppercase">{equip.name}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8 flex-grow">{equip.desc}</p>
                  
                  <div className="space-y-3 mb-8">
                    {equip.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check size={16} className="text-yellow-500" /> {spec}
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="w-full text-center bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 font-bold uppercase tracking-widest py-4 transition-all duration-300">
                    ติดต่อเช่าคันนี้
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact / Booking Form */}
      <section id="contact" className="py-32 relative bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="sticky top-32">
              <span className="text-yellow-500 text-sm font-bold tracking-[0.2em] uppercase block mb-4">INQUIRY FORM</span>
              <h2 className="font-serif text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight">
                จองคิวรถ <br/><span className="text-yellow-500">MAKRO-CLICK</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-12 max-w-md font-light text-lg">
                กรอกรายละเอียดงานที่คุณต้องการ เพื่อให้ทีมงานประเมินราคาและเช็คคิวรถที่ว่างให้คุณได้ทันที ให้บริการเฉพาะในเขตกรุงเทพฯ และปริมณฑล
              </p>

              <div className="flex flex-col gap-8 p-8 border border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-6">
                  <Phone size={32} strokeWidth={1} className="text-yellow-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="font-black text-white text-2xl">09X-XXX-XXXX</p>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-800"></div>
                <div className="flex items-center gap-6">
                  <MapPin size={32} strokeWidth={1} className="text-yellow-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Service Area</p>
                    <p className="font-medium text-white text-lg">กรุงเทพมหานคร และ ปริมณฑล</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-slate-950 border border-slate-800 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
                
                {contactSuccess ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-900 border border-yellow-500/30 text-yellow-500 flex items-center justify-center mx-auto mb-8">
                      <CheckCircle size={40} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">ข้อมูลถูกส่งเรียบร้อย</h3>
                    <p className="text-slate-400 font-light leading-relaxed">ทีมงาน Makro-Click ได้รับข้อมูลของคุณแล้ว เราจะรีบติดต่อกลับเพื่อยืนยันคิวรถและราคาภายใน 15 นาทีครับ</p>
                  </motion.div>
                ) : (
                  <form name="equipment-rental" method="POST" data-netlify="true" onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                    <input type="hidden" name="form-name" value="equipment-rental" />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-widest">ชื่อผู้ติดต่อ / บริษัท</label>
                        <input type="text" name="name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="form-input" placeholder="Company or Name" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-widest">เบอร์โทรศัพท์</label>
                        <input type="tel" name="phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} required className="form-input" placeholder="08X-XXX-XXXX" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-widest">ประเภทเครื่องจักรที่ต้องการเช่า</label>
                      <select name="machine-type" value={contactForm["machine-type"]} onChange={(e) => setContactForm({...contactForm, "machine-type": e.target.value})} required className="form-input cursor-pointer appearance-none">
                        <option value="" disabled>-- เลือกประเภทรถ --</option>
                        <option value="รถแบคโฮ PC30">รถแบคโฮ PC30</option>
                        <option value="รถแบคโฮ PC120">รถแบคโฮ PC120</option>
                        <option value="รถดัมพ์ 6 ล้อ">รถดัมพ์ 6 ล้อ</option>
                        <option value="รถดัมพ์ 10 ล้อ">รถดัมพ์ 10 ล้อ</option>
                        <option value="รถแทรคเตอร์ / เกรดเดอร์">รถแทรคเตอร์ / เกรดเดอร์</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-widest">สถานที่หน้างาน (เขต/จังหวัด)</label>
                      <input type="text" name="job-location" value={contactForm["job-location"]} onChange={(e) => setContactForm({...contactForm, "job-location": e.target.value})} required className="form-input" placeholder="เช่น ลาดพร้าว กรุงเทพฯ" />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> วันที่ต้องการเริ่มงาน</label>
                      <input type="date" name="date-needed" value={contactForm["date-needed"]} onChange={(e) => setContactForm({...contactForm, "date-needed": e.target.value})} required className="form-input style-date" />
                    </div>

                    <button type="submit" disabled={contactLoading} className="mt-8 w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-5 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3">
                      {contactLoading ? "SUBMITTING..." : "CONFIRM BOOKING"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-center border-t border-white/5">
        <div className="flex justify-center mb-6">
          <Truck size={24} className="text-slate-800" />
        </div>
        <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} MAKRO-CLICK EQUIPMENT RENTAL.
        </p>
      </footer>
    </div>
  );
}
