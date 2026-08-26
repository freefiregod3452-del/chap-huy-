# ចាបហួយ Online

Version នេះប្រើ **Supabase Database + Login**។ ទូរស័ព្ទច្រើនគ្រឿងអាច Login គណនីដូចគ្នា ហើយប្រើបញ្ជីអ្នកជំពាក់តែមួយ។

## Setup

1. បង្កើត project នៅ Supabase។
2. បើក SQL Editor ហើយ paste `supabase.sql` → Run។
3. បង្កើត User នៅ Authentication → Users (Email/Password)។
4. ចូល Project Settings → API ហើយយក Project URL និង anon key។
5. ដាក់វានៅក្នុង `config.js` ជំនួស `YOUR_SUPABASE_URL` និង `YOUR_SUPABASE_ANON_KEY`។
6. Upload files ទាំងអស់ទៅ GitHub repository។
7. បើក GitHub → Settings → Pages → Deploy from branch → `main` → `/root` → Save។

**ប្រាក់គិតជា រៀលខ្មែរ (៛)**។ Database ប្រើចំនួនគត់ ដូច្នេះមិនមាន decimal។
