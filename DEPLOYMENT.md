# 🚀 คู่มือการ Deploy เว็บจองสนามแบดมินตัน

## วิธีที่ 1: GitHub Pages (แนะนำ - ฟรีถาวร) 🌟

### ขั้นตอนที่ 1: เปิด Repository บน GitHub
1. ไปที่ https://github.com/irapad/tee
2. ตรวจสอบว่า code ถูก push ขึ้นไปแล้ว

### ขั้นตอนที่ 2: เปิดใช้งาน GitHub Pages
1. ไปที่ **Settings** (บนแถบเมนูด้านบน)
2. คลิกที่ **Pages** (ในเมนูด้านซ้าย)
3. ในส่วน **Source** เลือก: **GitHub Actions**
4. คลิก **Save**

### ขั้นตอนที่ 3: สร้าง Main Branch หรือ Merge Code
เนื่องจากต้องมี main branch สำหรับ GitHub Pages:

**ทางเลือก A: สร้าง Main Branch บน GitHub**
1. ไปที่แถบ **Code** > คลิกปุ่ม branch dropdown
2. สร้าง branch ใหม่ชื่อ **main**
3. ไปที่ **Settings** > **Branches**
4. เปลี่ยน Default branch เป็น **main**

**ทางเลือก B: Merge ผ่าน Pull Request**
1. สร้าง Pull Request จาก `claude/create-badminton-booking-011CUUS1Zz68GAahJKD22xgs` ไปยัง `main`
2. Merge PR
3. รอ GitHub Actions deploy อัตโนมัติ

### ขั้นตอนที่ 4: รอการ Deploy
1. ไปที่แถบ **Actions**
2. ดู workflow "Deploy to GitHub Pages" ทำงาน
3. เมื่อเสร็จจะมีเครื่องหมายถูกสีเขียว ✅

### ขั้นตอนที่ 5: เข้าใช้งานเว็บไซต์
เว็บไซต์จะอยู่ที่:
```
https://irapad.github.io/tee/
```

---

## วิธีที่ 2: Netlify (ง่ายที่สุด - 1 นาทีได้ link) ⚡

### แบบ Drag & Drop (ไม่ต้องสมัครสมาชิก)
1. เปิด https://app.netlify.com/drop
2. ลากโฟลเดอร์ `/home/user/tee` ทั้งหมดลงไป
3. ได้ link ทันทีแบบ: `https://random-name.netlify.app`

### แบบ Connect to GitHub (แนะนำ - Auto Deploy)
1. ไปที่ https://app.netlify.com
2. คลิก **Add new site** > **Import an existing project**
3. เชื่อมต่อกับ GitHub
4. เลือก repository: **irapad/tee**
5. กด **Deploy site**
6. ได้ link: `https://your-site-name.netlify.app`

**ข้อดี:**
- ✅ Deploy อัตโนมัติทุกครั้งที่ push code
- ✅ ได้ HTTPS ฟรี
- ✅ CDN ทั่วโลก (เร็วมาก)
- ✅ เปลี่ยนชื่อ domain ได้

---

## วิธีที่ 3: Vercel 🚀

1. ไปที่ https://vercel.com
2. คลิก **Add New** > **Project**
3. Import จาก GitHub: **irapad/tee**
4. คลิก **Deploy**
5. ได้ link: `https://tee.vercel.app`

**ข้อดี:**
- ✅ เร็วมาก
- ✅ Deploy อัตโนมัติ
- ✅ ฟรีไม่จำกัด
- ✅ เหมาะกับ static website

---

## วิธีที่ 4: Cloudflare Pages ☁️

1. ไปที่ https://pages.cloudflare.com
2. คลิก **Create a project**
3. Connect to GitHub
4. เลือก **irapad/tee**
5. คลิก **Begin setup** > **Save and Deploy**
6. ได้ link: `https://tee.pages.dev`

---

## วิธีที่ 5: Deploy บน Server ของตัวเอง 🖥️

### ใช้ Apache/Nginx
```bash
# Copy ไฟล์ทั้งหมดไปยัง web root
sudo cp -r /home/user/tee/* /var/www/html/badminton/
```

### ใช้ Python Simple Server (ชั่วคราว)
```bash
cd /home/user/tee
python3 -m http.server 8080 --bind 0.0.0.0
```
เปิดที่: `http://YOUR_IP:8080`

---

## 🎯 แนะนำสำหรับแต่ละกรณี

| ความต้องการ | แนะนำ | เหตุผล |
|------------|------|--------|
| ง่ายที่สุด, ได้เลยใน 1 นาที | **Netlify Drop** | ลาก-วาง ไม่ต้องสมัคร |
| ฟรี ถาวร มี GitHub อยู่แล้ว | **GitHub Pages** | ไม่มีค่าใช้จ่าย ใช้ Git ควบคุม |
| เร็วที่สุด Auto Deploy | **Vercel** | CDN เร็ว Deploy อัตโนมัติ |
| ใช้งานในองค์กร Local | **Python Server** | ไม่ต้องขึ้น internet |

---

## 📝 สรุป Link หลังจาก Deploy

เมื่อ deploy เสร็จแล้ว คุณจะได้ link แบบนี้:

- **GitHub Pages**: `https://irapad.github.io/tee/`
- **Netlify**: `https://your-site.netlify.app`
- **Vercel**: `https://tee.vercel.app`
- **Cloudflare**: `https://tee.pages.dev`

**Link เหล่านี้:**
- ✅ เปิดได้จากทุกที่ทั่วโลก
- ✅ เปิดได้ทั้งคอมพิวเตอร์และมือถือ
- ✅ มี HTTPS ปลอดภัย
- ✅ ฟรี ไม่มีค่าใช้จ่าย

---

## 🆘 แก้ไขปัญหา

### ปัญหา: GitHub Pages ไม่ทำงาน
- ตรวจสอบว่า repository เป็น **Public**
- ตรวจสอบว่าเปิดใช้ GitHub Pages ใน Settings แล้ว
- ดู Actions tab ว่า workflow รันสำเร็จหรือไม่

### ปัญหา: หน้าเว็บขึ้น 404
- ตรวจสอบว่าไฟล์ `index.html` อยู่ที่ root ของ repository
- ลอง Clear cache ของ browser (Ctrl+Shift+R)

### ปัญหา: CSS/JS ไม่โหลด
- ตรวจสอบ path ของไฟล์ใน `index.html`
- ตรวจสอบ Console ใน Browser DevTools (F12)

---

## 🎉 เสร็จแล้ว!

หลังจาก deploy แล้ว ทดสอบเว็บไซต์โดย:
1. เปิดจากมือถือดู
2. ทดลองจองสนาม
3. ทดสอบยกเลิกการจอง
4. แชร์ link ให้เพื่อนลองใช้

**มีปัญหาหรือต้องการความช่วยเหลือ?**
- เช็ค README.md สำหรับรายละเอียดเพิ่มเติม
- ดู Issues บน GitHub
