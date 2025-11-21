# VPS-এ Next.js অ্যাপ্লিকেশন ডেপ্লয় করার নির্দেশিকা

এই নির্দেশিকাটি অনুসরণ করে আপনি আপনার Next.js অ্যাপ্লিকেশনটি একটি VPS (Virtual Private Server)-এ ডেপ্লয় করতে পারবেন। আমরা এখানে একটি Ubuntu সার্ভার এবং Nginx রিভার্স প্রক্সি ব্যবহার করার পদ্ধতি দেখাব।

## পূর্বশর্ত

1.  আপনার একটি VPS থাকতে হবে (যেমন: DigitalOcean, Linode, Vultr)।
2.  আপনার VPS-এ **Node.js** (ভার্সন 18 বা তার বেশি) এবং **npm** ইনস্টল করা থাকতে হবে।
3.  আপনার একটি ডোমেইন নাম থাকতে হবে যা আপনার VPS-এর IP ঠিকানার দিকে নির্দেশ করে।
4.  আপনার সার্ভারে **Git** এবং **Nginx** ইনস্টল করা থাকতে হবে।

```bash
# সার্ভারে Nginx এবং Git ইনস্টল করুন
sudo apt update
sudo apt install nginx git -y
```

## ধাপ ১: প্রজেক্ট কোড সার্ভারে আনা

প্রথমে, আপনার প্রজেক্টটি একটি Git রিপোজিটরিতে (যেমন: GitHub, GitLab) পুশ করুন। এরপর আপনার VPS-এ লগইন করে সেই রিপোজিটরি থেকে কোড ক্লোন করুন।

```bash
# আপনার পছন্দের ডিরেক্টরিতে যান, যেমন /var/www
cd /var/www

# আপনার রিপোজিটরি ক্লোন করুন
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# প্রজেক্ট ফোল্ডারে প্রবেশ করুন
cd YOUR_REPOSITORY
```

## ধাপ ২: অ্যাপ্লিকেশন কনফিগার করা

### ক. পরিবেশগত ভেরিয়েবল (Environment Variables)

আপনার অ্যাপ্লিকেশনের জন্য প্রয়োজনীয় এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করতে হবে। এর জন্য একটি `.env.local` ফাইল তৈরি করুন।

```bash
# .env.local ফাইল তৈরি করুন
nano .env.local
```

এই ফাইলে নিম্নলিখিত ভেরিয়েবলগুলো যোগ করুন এবং আপনার Firebase ও reCAPTCHA প্রোজেক্টের আসল কী (key) দিয়ে পরিবর্তন করুন:

```env
# reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=আপনার_সাইট_কী
RECAPTCHA_SECRET_KEY=আপনার_সিক্রেট_কী

# Firebase কনফিগারেশন (src/firebase/config.ts থেকে কপি করুন)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**গুরুত্বপূর্ণ:** `src/firebase/config.ts` ফাইলে থাকা Firebase কনফিগারেশনটি `.env.local` ফাইলে `NEXT_PUBLIC_` প্রিফিক্সসহ যুক্ত করুন এবং `src/firebase/config.ts` ফাইলটি আপডেট করে এনভায়রনমেন্ট ভেরিয়েবল থেকে মানগুলো পড়ার ব্যবস্থা করুন।

### খ. প্রয়োজনীয় প্যাকেজ ইনস্টল করা

```bash
npm install
```

## ধাপ ৩: অ্যাপ্লিকেশন বিল্ড করা

প্রোডাকশনের জন্য আপনার Next.js অ্যাপ্লিকেশনটি বিল্ড করুন।

```bash
npm run build
```

এই কমান্ডটি `.next` নামে একটি ফোল্ডার তৈরি করবে, যেখানে আপনার প্রোডাকশন-রেডি অ্যাপ্লিকেশন থাকবে।

## ধাপ ৪: PM2 দিয়ে অ্যাপ্লিকেশন চালানো

PM2 হলো একটি প্রোসেস ম্যানেজার যা আপনার Node.js অ্যাপ্লিকেশনকে ব্যাকগ্রাউন্ডে চালু রাখতে এবং ক্র্যাশ করলে স্বয়ংক্রিয়ভাবে রিস্টার্ট করতে সাহায্য করে।

```bash
# PM2 ইনস্টল করুন (যদি না থাকে)
sudo npm install pm2 -g

# আপনার অ্যাপ্লিকেশনটি PM2 দিয়ে শুরু করুন
pm2 start npm --name "jamaat-nama" -- start
```

-   `--name "jamaat-nama"`: আপনার অ্যাপ্লিকেশনের জন্য একটি নাম সেট করবে।
-   `-- start`: `package.json` ফাইলের `start` স্ক্রিপ্টটি (`next start`) চালাবে।

আপনার অ্যাপ্লিকেশনটি এখন `http://localhost:3000` পোর্টে চলতে থাকবে।

আপনি `pm2 list` কমান্ড দিয়ে চলমান প্রসেসগুলো দেখতে পারেন এবং `pm2 logs jamaat-nama` দিয়ে লগ দেখতে পারেন।

## ধাপ ৫: Nginx কে রিভার্স প্রক্সি হিসেবে কনফিগার করা

এখন আমরা Nginx কনফিগার করব যাতে আপনার ডোমেইনে gelen ট্র্যাফিক Next.js অ্যাপ্লিকেশনের (পোর্ট 3000) দিকে পাঠানো হয়।

```bash
# একটি নতুন Nginx কনফিগারেশন ফাইল তৈরি করুন
sudo nano /etc/nginx/sites-available/jamaatnama
```

ফাইলটিতে নিম্নলিখিত কনফিগারেশন লিখুন এবং `your_domain.com`-কে আপনার আসল ডোমেইন দিয়ে পরিবর্তন করুন:

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

এই কনফিগারেশন ফাইলটি `sites-enabled` ডিরেক্টরিতে একটি সিমলিঙ্ক তৈরি করে সক্রিয় করুন:

```bash
sudo ln -s /etc/nginx/sites-available/jamaatnama /etc/nginx/sites-enabled/
```

Nginx কনফিগারেশন পরীক্ষা করুন এবং রিস্টার্ট করুন:

```bash
# কনফিগারেশন সিনট্যাক্স পরীক্ষা করুন
sudo nginx -t

# সবকিছু ঠিক থাকলে Nginx রিস্টার্ট করুন
sudo systemctl restart nginx
```

## ধাপ ৬: SSL সার্টিফিকেট ইনস্টল করা (HTTPS)

আপনার সাইটকে সুরক্ষিত করার জন্য Let's Encrypt ব্যবহার করে একটি বিনামূল্যের SSL সার্টিফিকেট ইনস্টল করা অত্যন্ত গুরুত্বপূর্ণ।

```bash
# Certbot ইনস্টল করুন
sudo apt install certbot python3-certbot-nginx -y

# আপনার ডোমেইনের জন্য SSL সার্টিফিকেট তৈরি এবং Nginx কনফিগার করুন
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

Certbot স্বয়ংক্রিয়ভাবে আপনার Nginx কনফিগারেশন আপডেট করে HTTPS চালু করে দেবে।

এখন আপনি ব্রাউজারে আপনার ডোমেইন (`https://your_domain.com`) ভিজিট করলে আপনার Next.js অ্যাপ্লিকেশনটি দেখতে পাবেন।
