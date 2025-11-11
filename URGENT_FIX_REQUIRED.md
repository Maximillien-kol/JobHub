## 🚨 CRITICAL: You Must Run the SQL Script in Supabase

The error `Supabase error adding job: {}` means your Supabase RLS policies are blocking the insert operation.

## Quick Fix (2 Minutes)

### Step 1: Open Supabase
Go to: https://supabase.com/dashboard/project/ususiljxhkrjvzfcixcr/sql/new

### Step 2: Paste This SQL and Click "Run"
```sql
-- Drop old policies
DROP POLICY IF EXISTS "Authenticated users can insert jobs" ON jobs;
DROP POLICY IF EXISTS "Authenticated users can update jobs" ON jobs;
DROP POLICY IF EXISTS "Authenticated users can delete jobs" ON jobs;

-- Create new policies allowing anonymous access
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
```

### Step 3: Test
After running the SQL:
1. Refresh your browser at http://localhost:3000
2. Go to Dashboard → Add New Job
3. Fill out the form and click "Add Job"
4. ✅ It will work!

## Why This Happens

Your app uses localStorage authentication (not Supabase auth), so the Supabase client sees you as an **anonymous user**. 

The old RLS policies only allowed **authenticated Supabase users** to add jobs, which is why it fails.

## For Companies & Exams Too

If you also want to add companies and exams, run this additional SQL:

```sql
-- Companies
DROP POLICY IF EXISTS "Authenticated users can insert companies" ON companies;
CREATE POLICY "Anyone can insert companies" ON companies FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update companies" ON companies FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Anyone can delete companies" ON companies FOR DELETE TO anon, authenticated USING (true);

-- Exams
DROP POLICY IF EXISTS "Authenticated users can insert exams" ON exams;
CREATE POLICY "Anyone can insert exams" ON exams FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update exams" ON exams FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Anyone can delete exams" ON exams FOR DELETE TO anon, authenticated USING (true);

-- Exam Questions
DROP POLICY IF EXISTS "Authenticated users can insert exam_questions" ON exam_questions;
CREATE POLICY "Anyone can insert exam_questions" ON exam_questions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update exam_questions" ON exam_questions FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Anyone can delete exam_questions" ON exam_questions FOR DELETE TO anon, authenticated USING (true);
```

## That's It!
Once you run the SQL, everything will work perfectly - both locally and on Vercel! 🚀
