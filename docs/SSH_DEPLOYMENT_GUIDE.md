# Detailed SSH/Git Deployment Guide for Hostinger

## 🚀 Complete Step-by-Step Guide to Deploy via SSH

---

## **Part 1: Enable SSH Access in Hostinger**

### Step 1: Login to Hostinger hPanel
1. Go to: https://hpanel.hostinger.com
2. Enter your email and password
3. Click "Login"

### Step 2: Navigate to SSH Access
1. Once logged in, you'll see your dashboard
2. Look for your domain **qynzoo.com** in the list
3. Click on **"Manage"** next to qynzoo.com
4. In the left sidebar, find **"Advanced"** section
5. Click on **"SSH Access"**

### Step 3: Enable SSH Access
1. You'll see a toggle switch that says **"SSH access"**
2. Click the toggle to **turn it ON** (it will turn blue/green)
3. A popup may appear asking for confirmation - click **"Enable"**
4. Wait a few seconds for SSH to activate

### Step 4: Get Your SSH Credentials
Once SSH is enabled, you'll see this information:

```
SSH Access Details:
├── Hostname: your-server.hostinger.com (or IP: 123.45.67.89)
├── Username: u123456789
├── Port: 65002 (or 22)
└── Password: (use your hPanel password OR set SSH password)
```

**Important:** Write down these details:
- **Hostname/IP**: 46.202.156.35
- **Username**: u569968605
- **Port**: 65002
- **Password**: (your hPanel password)

---

## **Part 2: Connect to Your Server via SSH**

### Option A: Using Windows (PowerShell or Command Prompt)

#### Step 1: Open PowerShell
1. Press `Windows Key + X`
2. Click **"Windows PowerShell"** or **"Terminal"**
3. A black/blue window will open

#### Step 2: Connect via SSH
Type this command (replace with YOUR details):

```bash
ssh -p 65002 u569968605@your-server.hostinger.com
```

**Replace:**
- `65002` → Your SSH port number
- `u123456789` → Your username
- `your-server.hostinger.com` → Your hostname

**Example:**
```bash
ssh -p 65002 u987654321@srv123.hostinger.com
```

#### Step 3: Accept Fingerprint (First Time Only)
You'll see:
```
The authenticity of host 'srv123.hostinger.com' can't be established.
ECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxx
Are you sure you want to continue connecting (yes/no)?
```

Type: **`yes`** and press Enter

#### Step 4: Enter Password
- Type your hPanel password
- **You won't see characters as you type** (this is normal for security)
- Press Enter

#### Step 5: You're In! ✅
You should see something like:
```
u987654321@srv123:~$
```

This means you're connected! 🎉

---

### Option B: Using Mac/Linux (Terminal)

#### Step 1: Open Terminal
1. Press `Cmd + Space` (Mac)
2. Type "Terminal"
3. Press Enter

#### Step 2: Connect via SSH
```bash
ssh -p 65002 u123456789@your-server.hostinger.com
```

(Same steps 3-5 as Windows above)

---

### Option C: Using PuTTY (Windows - Alternative)

#### Step 1: Download PuTTY
1. Go to: https://www.putty.org
2. Download **"putty.exe"**
3. Run the installer

#### Step 2: Configure PuTTY
1. Open PuTTY
2. In **"Host Name"** field, enter: `your-server.hostinger.com`
3. In **"Port"** field, enter: `65002`
4. Select **"SSH"** as connection type
5. Click **"Open"**

#### Step 3: Login
1. Terminal opens with: `login as:`
2. Type your username: `u123456789`
3. Press Enter
4. Type your password (won't show)
5. Press Enter

---

## **Part 3: Backup Current WordPress Site**

⚠️ **CRITICAL: Always backup before deleting!**

### Step 1: Create Backup Directory
```bash
mkdir ~/backup_wordpress
cd ~/backup_wordpress
```

### Step 2: Backup Current Files
```bash
cp -r ~/public_html ~/backup_wordpress/public_html_backup
```

This copies everything to a safe location.

### Step 3: Verify Backup Created
```bash
ls -la ~/backup_wordpress
```

You should see: `public_html_backup` directory listed

**✅ Your WordPress is now safely backed up!**

---

## **Part 4: Clear Old WordPress Files**

### Step 1: Navigate to public_html
```bash
cd ~/public_html
```

### Step 2: List Current Files (Optional - to see what's there)
```bash
ls -la
```

You'll see WordPress files like:
- wp-admin/
- wp-content/
- wp-config.php
- index.php
- etc.

### Step 3: Delete ALL Files
```bash
rm -rf *
```

⚠️ **Warning:** This deletes everything in public_html!
- Make sure you're in `~/public_html`
- Make sure you created backup first
- This action cannot be undone!

### Step 4: Delete Hidden Files Too
```bash
rm -rf .*
```

But keep . and ..:
```bash
rm -rf .htaccess .well-known
```

### Step 5: Verify Everything is Gone
```bash
ls -la
```

You should see ONLY:
```
total 8
drwxr-xr-x  2 u123456789 u123456789 4096 Jan 15 12:00 .
drwxr-xr-x 10 u123456789 u123456789 4096 Jan 15 11:00 ..
```

**✅ Old files are cleared!**

---

## **Part 5: Clone Your GitHub Repository**

### Step 1: Make Sure You're in public_html
```bash
cd ~/public_html
pwd
```

Should show: `/home/u123456789/public_html`

### Step 2: Clone GitHub Repository
```bash
git clone https://github.com/steveyaghi/Qynzoo.git .
```

**Important:** Notice the **`.`** (dot) at the end!
- The dot means "clone into current directory"
- Without the dot, it creates a subfolder

### What You'll See:
```
Cloning into '.'...
remote: Enumerating objects: 125, done.
remote: Counting objects: 100% (125/125), done.
remote: Compressing objects: 100% (89/89), done.
remote: Total 125 (delta 28), reused 125 (delta 28)
Receiving objects: 100% (125/125), 2.34 MiB | 5.67 MiB/s, done.
Resolving deltas: 100% (28/28), done.
```

**✅ Files are downloading!**

### Step 3: Verify Files Downloaded
```bash
ls -la
```

You should now see:
```
blog-geo-vs-seo.html
blog-local-ai.html
blogs.html
coming-soon.html
css/
images/
index.html
js/
logos/
... etc
```

**✅ Your website files are now on the server!**

---

## **Part 6: Set Correct Permissions**

This ensures your web server can read the files.

### Set File Permissions
```bash
find ~/public_html -type f -exec chmod 644 {} \;
```

### Set Directory Permissions
```bash
find ~/public_html -type d -exec chmod 755 {} \;
```

### What this does:
- **644**: Files are readable by everyone, writable only by you
- **755**: Directories are accessible by everyone, writable only by you

**✅ Permissions are set!**

---

## **Part 7: Test Your Website**

### Step 1: Open Your Browser
Go to: **https://qynzoo.com**

### Step 2: What You Should See:
- Your new homepage with the yellow "Transform Your Business with AI Automation" title
- Mostafa's founder card
- The contact form
- All the sections

### Step 3: Check Multiple Pages
- https://qynzoo.com/blogs.html
- https://qynzoo.com/blog-geo-vs-seo.html
- https://qynzoo.com/coming-soon.html

**✅ If you see your new site - SUCCESS!** 🎉

---

## **Part 8: Set Up Auto-Deployment (Optional but Recommended)**

This makes it so every time you push to GitHub, your website automatically updates!

### Method 1: Simple Git Pull Script

#### Step 1: Create Update Script
```bash
cd ~/public_html
nano update.sh
```

#### Step 2: Add This Content:
```bash
#!/bin/bash
cd ~/public_html
git pull origin main
```

#### Step 3: Save and Exit
- Press `Ctrl + X`
- Press `Y` (yes)
- Press `Enter`

#### Step 4: Make Script Executable
```bash
chmod +x ~/public_html/update.sh
```

#### Step 5: Update Your Site Anytime
Whenever you want to update from GitHub:
```bash
cd ~/public_html
./update.sh
```

**✅ Your site updates in seconds!**

---

### Method 2: Set Up Cron Job (Advanced - Auto-update every hour)

#### Step 1: Open Crontab
```bash
crontab -e
```

#### Step 2: Add This Line
```
0 * * * * cd ~/public_html && git pull origin main
```

This checks for updates every hour.

#### Step 3: Save
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

**✅ Your site auto-updates hourly!**

---

## **Part 9: Configure SSL (HTTPS)**

### Step 1: Go Back to hPanel
1. Exit SSH: Type `exit` and press Enter
2. Go back to your browser
3. In hPanel, go to **"Security"** → **"SSL"**

### Step 2: Enable SSL
1. Find your domain: **qynzoo.com**
2. Click **"Install SSL"** or toggle the switch
3. Select **"Let's Encrypt SSL"** (Free)
4. Click **"Install"**

### Step 3: Force HTTPS Redirect
Add this to your `.htaccess` file:

```bash
cd ~/public_html
nano .htaccess
```

Add:
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Save and exit (Ctrl+X, Y, Enter)

**✅ Your site is now secure with HTTPS!** 🔒

---

## **Troubleshooting Common Issues**

### Issue 1: "Permission denied (publickey)"
**Solution:**
```bash
ssh -p 65002 -o PreferredAuthentications=password u123456789@your-server.hostinger.com
```

### Issue 2: "git: command not found"
**Solution:**
Contact Hostinger support to install Git, or use File Manager method instead.

### Issue 3: "Directory not empty"
**Solution:**
```bash
cd ~/public_html
rm -rf * .*
git clone https://github.com/steveyaghi/Qynzoo.git .
```

### Issue 4: Website shows 403 Forbidden
**Solution:**
```bash
chmod 644 ~/public_html/index.html
chmod 755 ~/public_html
```

### Issue 5: Images/CSS not loading
**Solution:**
```bash
cd ~/public_html
chmod -R 755 css/ images/ js/ logos/
```

---

## **Quick Reference Commands**

```bash
# Connect to server
ssh -p 65002 u123456789@your-server.hostinger.com

# Navigate to website directory
cd ~/public_html

# Update website from GitHub
git pull origin main

# Check what files are present
ls -la

# View recent changes
git log --oneline -5

# Check current directory
pwd

# Exit SSH
exit
```

---

## **Security Best Practices**

### 1. Change SSH Password
In hPanel → SSH Access → Change Password

### 2. Use SSH Keys (Advanced)
```bash
ssh-keygen -t rsa -b 4096
ssh-copy-id -p 65002 u123456789@your-server.hostinger.com
```

### 3. Disable Password Auth (After setting up keys)
Edit: `/etc/ssh/sshd_config`
Set: `PasswordAuthentication no`

---

## **Need Help?**

### Hostinger Support:
- **Live Chat**: Available 24/7 in hPanel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com

### Common Questions:

**Q: Do I need to do this every time I update my site?**
A: No! Just run: `cd ~/public_html && git pull` or use the auto-update script.

**Q: Can I use FileZilla instead?**
A: Yes! But Git is easier for updates. For FileZilla:
- Host: sftp://your-server.hostinger.com
- Port: 65002
- Protocol: SFTP

**Q: What if I mess up?**
A: You have a backup! Restore it:
```bash
rm -rf ~/public_html/*
cp -r ~/backup_wordpress/public_html_backup/* ~/public_html/
```

---

## **Success Checklist** ✅

- [ ] SSH access enabled in hPanel
- [ ] Successfully connected via SSH
- [ ] Backed up old WordPress files
- [ ] Deleted old files from public_html
- [ ] Cloned GitHub repository
- [ ] Set correct file permissions
- [ ] Website loads at qynzoo.com
- [ ] SSL certificate installed
- [ ] HTTPS redirect working
- [ ] All pages load correctly
- [ ] Contact form accessible
- [ ] Images and styles loading
- [ ] Mobile responsive working

---

**🎉 Congratulations!**

Your website is now live, version-controlled, and easily updatable!

**Total Time:** 15-30 minutes
**Difficulty:** Intermediate
**Result:** Professional, fast website with Git deployment! 🚀
