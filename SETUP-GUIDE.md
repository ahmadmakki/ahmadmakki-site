# Getting your site live — step by step

Total time: about 20 minutes, one time only. After this, you edit your site by
visiting one web page and typing. No code, ever.

Everything below is free.

---

## Step 1 — Make a GitHub account (5 min)

GitHub is just where your site's files live. You will almost never look at it.

1. Go to **github.com** and click **Sign up**. Use your email, pick a username.
2. Once logged in, click the **+** in the top right → **New repository**.
3. Name it: `ahmadmakki-site`
4. Set it to **Public**.
5. Check the box **Add a README file**.
6. Click **Create repository**.

You now have an empty repository. Leave this tab open.

---

## Step 2 — Upload your site files (3 min)

1. In your new repository, click **Add file** → **Upload files**.
2. Open the folder of site files I gave you on your computer.
3. Select **everything inside it** and drag it into the browser window.
   - Important: drag the *contents* of the folder, not the folder itself.
4. Scroll down, click **Commit changes**.

Wait for the upload to finish. Your files are now on GitHub.

---

## Step 3 — Connect Netlify (5 min)

Netlify takes your files and turns them into a live website.

1. Go to **netlify.com** → **Sign up** → choose **Sign up with GitHub**.
2. Authorize it when asked.
3. On your Netlify dashboard: **Add new site** → **Import an existing project**.
4. Choose **GitHub**, then pick your `ahmadmakki-site` repository.
5. Netlify will show build settings. They should already say:
   - Build command: `jekyll build`
   - Publish directory: `_site`
   If not, type those in.
6. Click **Deploy site**.

Wait ~2 minutes. Netlify gives you a live URL like
`random-name-12345.netlify.app`.

**Your site is live.** You can rename that URL: Site settings → Change site name.

---

## Step 4 — Turn on your editing panel (5 min)

This is the part that lets you edit without code.

1. In Netlify, go to your site → **Site configuration** → **Identity**
   (in some accounts it's under **Integrations**).
2. Click **Enable Identity**.
3. Still under Identity, find **Registration** → set it to **Invite only**.
   (This stops strangers from signing up to edit your site.)
4. Scroll to **Services** → **Git Gateway** → click **Enable Git Gateway**.
5. Now go to the **Identity** tab at the top → **Invite users** → enter your own
   email → send.
6. Check your email, click the invite link, set a password.

**Done.** Now go to `your-site-url.netlify.app/admin` and log in with that
password.

You'll see a simple editor where you can:
- Change any text on your homepage
- Add, edit, or delete blog posts
- Upload images

Click **Publish** and your live site updates in about a minute.

---

## Step 5 — Make the contact form work (2 min)

Right now the form looks right but doesn't send anywhere. Fix:

1. Go to **web3forms.com**.
2. Enter your email (`ahmadmakki01@outlook.com`) and click to get an access key.
3. Check your email — you'll receive a long access key string.
4. In GitHub, open your repository → click the file `_config.yml`.
5. Click the pencil icon to edit.
6. Find this line:
   ```
   web3forms_key: "PASTE-YOUR-WEB3FORMS-KEY-HERE"
   ```
   Replace the placeholder with your real key, keeping the quotes.
7. Click **Commit changes**.

Your form now emails you whenever someone fills it in. Free plan covers 250
messages a month, which is plenty.

---

## Optional — your own domain name

The free `.netlify.app` address works fine. If you later want something like
`ahmadmakki.com`, that costs about $10–15 a year from Namecheap or Porkbun.
Netlify connects it in Site settings → Domain management. Everything else stays
free.

---

## From now on

To update your site, you only ever need to do this:

1. Go to `your-site-url/admin`
2. Log in
3. Edit and click **Publish**

You never touch GitHub or code again.

---

## If something goes wrong

- **Build failed on Netlify** — open the deploy log, it usually names the file
  with the problem. Most common cause is a missing file from the upload in
  Step 2.
- **Can't log in to /admin** — Git Gateway probably isn't enabled. Redo Step 4,
  point 4.
- **Form not sending** — the access key in `_config.yml` is wrong or still the
  placeholder text.
