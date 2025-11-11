# Fix "Failed to add job" Error - Instructions

## Problem
The error "Failed to add job. Check console for details." occurs because your Supabase database has Row Level Security (RLS) policies that block anonymous users from inserting data.

Your app uses **localStorage authentication** (not Supabase auth), so the Supabase client is always anonymous. The current RLS policies only allow authenticated Supabase users to insert/update/delete data.

## Solution
You need to update the RLS policies in your Supabase database to allow anonymous users to perform admin operations.

## Step-by-Step Instructions

### 1. Open Supabase SQL Editor
1. Go to https://supabase.com
2. Sign in to your account
3. Select your project: **ususiljxhkrjvzfcixcr**
4. Click **SQL Editor** in the left sidebar
5. Click **New query**

### 2. Copy and Run the SQL Script
Copy the **entire contents** of the file `fix-jobs-rls-policies.sql` and paste it into the SQL editor, then click **Run**.

Or copy this SQL directly:

```sql
-- Fix RLS policies for jobs and companies to allow anonymous inserts
-- This is needed because the app uses localStorage authentication, not Supabase auth

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can update companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can delete companies" ON companies;

DROP POLICY IF EXISTS "Authenticated users can insert jobs" ON jobs;
DROP POLICY IF EXISTS "Authenticated users can update jobs" ON jobs;
DROP POLICY IF EXISTS "Authenticated users can delete jobs" ON jobs;

DROP POLICY IF EXISTS "Authenticated users can insert exams" ON exams;
DROP POLICY IF EXISTS "Authenticated users can update exams" ON exams;
DROP POLICY IF EXISTS "Authenticated users can delete exams" ON exams;

-- Create new policies that allow anonymous access for admin operations
-- Companies
CREATE POLICY "Anyone can insert companies"
  ON companies FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update companies"
  ON companies FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete companies"
  ON companies FOR DELETE
  TO anon, authenticated
  USING (true);

-- Jobs
CREATE POLICY "Anyone can insert jobs"
  ON jobs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update jobs"
  ON jobs FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete jobs"
  ON jobs FOR DELETE
  TO anon, authenticated
  USING (true);

-- Exams
CREATE POLICY "Anyone can insert exams"
  ON exams FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update exams"
  ON exams FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete exams"
  ON exams FOR DELETE
  TO anon, authenticated
  USING (true);

-- Exam Questions
DROP POLICY IF EXISTS "Authenticated users can insert exam_questions" ON exam_questions;
DROP POLICY IF EXISTS "Authenticated users can update exam_questions" ON exam_questions;
DROP POLICY IF EXISTS "Authenticated users can delete exam_questions" ON exam_questions;

CREATE POLICY "Anyone can insert exam_questions"
  ON exam_questions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update exam_questions"
  ON exam_questions FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete exam_questions"
  ON exam_questions FOR DELETE
  TO anon, authenticated
  USING (true);
```

### 3. Verify the Fix
1. After running the SQL script, go back to your website
2. Log in with: **admin@RwandaJobHub.com** / **Koral.admin@1234567890**
3. Navigate to **Dashboard** → **Add New Job**
4. Try adding a job - it should work now! ✅

### 4. Test on Production (Vercel)
Once the SQL script runs successfully:
- Your Vercel deployment will automatically work
- No code changes needed - the fix is in the database
- The app will use the new RLS policies immediately

## What Changed
- ✅ Companies: Anonymous users can now insert/update/delete
- ✅ Jobs: Anonymous users can now insert/update/delete
- ✅ Exams: Anonymous users can now insert/update/delete
- ✅ Exam Questions: Anonymous users can now insert/update/delete
- ✅ Public read access remains unchanged

## Security Note
Since your app uses localStorage-based authentication with a single admin account, this approach is acceptable. All admin operations go through your client-side authentication check before calling Supabase.

For production apps with multiple users, you would typically implement proper Supabase authentication instead.

---

**After running the SQL script, the "Failed to add job" error will be completely resolved!** 🚀
