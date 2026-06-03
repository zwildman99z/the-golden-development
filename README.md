# THE GOLDEN DEVELOPMENT - เว็บไซต์บริษัทอสังหาริมทรัพย์แบบ One-page scroll

เว็บไซต์อสังหาริมทรัพย์และที่ปรึกษาสินเชื่อแบบ One-page scroll พัฒนาด้วย Next.js (App Router), Tailwind CSS และ framer-motion พร้อมสำหรับ Deploy บน Netlify (รองรับ Static HTML Export และ Netlify Forms)

## 📁 โครงสร้างโปรเจกต์ที่สำคัญ

- `src/app/page.js` : ไฟล์หลักที่รวมทุก Section บนเว็บไซต์ (Navbar, Hero, About, Services, Partners, Careers, Contact, Footer)
- `src/app/globals.css` : ไฟล์กำหนดค่าสไตล์ธีมสีและฟอนต์ รวมถึงฟิลเตอร์และแอนิเมชันเสริม
- `src/app/layout.js` : ไฟล์โครงสร้าง Layout หลัก (กำหนดการดึงฟอนต์ Playfair Display และ IBM Plex Sans Thai พร้อม SEO Metadata)
- `public/__forms.html` : ไฟล์สำเนาฟอร์มภาษา HTML แบบ Static เพื่อให้ Netlify Build Bot ตรวจเจอและใช้ระบบ Netlify Forms ได้
- `next.config.mjs` : ไฟล์ตั้งค่า Next.js ให้เป็น Static Export (`output: 'export'`)
- `netlify.toml` : ไฟล์ตั้งค่าการ Build และโฟลเดอร์ปลายทางสำหรับ Netlify (`out`)

---

## 🚀 วิธีการ Deploy ขึ้น Netlify

### วิธีที่ 1: เชื่อมต่อผ่าน Git (แนะนำ)
1. นำโฟลเดอร์นี้อัปโหลดขึ้น GitHub / GitLab / Bitbucket
2. ล็อกอินเข้า Netlify -> คลิก **Add new site** -> เลือก **Import an existing project**
3. เลือก Repository ที่ต้องการเชื่อมต่อ
4. ตั้งค่า Build settings (จะถูกดึงจาก `netlify.toml` อัตโนมัติ):
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. คลิก **Deploy site**

### วิธีที่ 2: Deploy ด้วยตนเอง (Netlify Drop)
1. ทำการ Build โปรเจกต์ในเครื่องด้วยคำสั่ง:
   ```bash
   npm run build
   ```
2. หลังการ Build เสร็จสิ้น จะได้โฟลเดอร์ชื่อ `out` ขึ้นมา
3. ลากและวางโฟลเดอร์ `out` ไปที่ [Netlify Drop](https://app.netlify.com/drop) เพื่ออัปโหลดขึ้นเซิร์ฟเวอร์โดยตรง

---

## 🛠️ วิธีการปรับแต่งข้อความและรูปภาพ

ภายในไฟล์โค้ดได้มีการเขียนคอมเมนต์ภาษาไทย (เช่น `TODO:`) กำกับจุดที่ต้องเปลี่ยนรูปภาพและข้อความไว้เรียบร้อยแล้ว โดยมีแนวทางหลักดังนี้:

### 1. การเปลี่ยนรูปภาพและโลโก้
รูปภาพทั้งหมดจะถูกเรียกใช้งานผ่านโฟลเดอร์ `/public`
- **โลโก้บริษัท:** เตรียมภาพโลโก้ของคุณและเซฟไว้ที่ `/public/logo.png`
- **ภาพแบนเนอร์หลัก (Hero Banner):** เซฟรูปภาพความละเอียดสูงที่ต้องการใช้เป็นพื้นหลังไว้ที่ `/public/hero-bg-placeholder.jpg`
- **ภาพฝั่งเกี่ยวกับการบริการ/เกี่ยวกับเรา:** เซฟรูปที่ต้องการไว้ที่ `/public/about-placeholder.jpg`

### 2. การเพิ่ม/ลด โครงการพาร์ทเนอร์
สามารถเข้าไปแก้ไขรายชื่อโครงการได้ในไฟล์ [src/app/page.js](file:///C:/Users/AreaS/.gemini/antigravity/scratch/the-golden-development/src/app/page.js) บริเวณบรรทัดที่ 10-33:
- ตัวแปร `partnerCondos`: สำหรับใส่รายชื่อโครงการคอนโดมิเนียม
- ตัวแปร `partnerHouses`: สำหรับใส่รายชื่อโครงการบ้าน/ทาวน์โฮม

### 3. การแก้ไขอีเมล/เบอร์โทร หรือลิงก์การติดต่อ
เข้าไปแก้ไขค่าในไฟล์ [src/app/page.js](file:///C:/Users/AreaS/.gemini/antigravity/scratch/the-golden-development/src/app/page.js) ได้ตามต้องการ เช่น:
- ลิงก์ Line ID และ Facebook
- เบอร์โทรศัพท์ติดต่อตรง
- พิกัด iframe แผนที่ Google Maps ในส่วนของติดต่อเรา (Contact Section)
