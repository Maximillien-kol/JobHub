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
