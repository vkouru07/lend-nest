/*
  # Add area code and requests table

  1. Changes
    - Add area_code column to profiles table
  
  2. New Tables
    - `tool_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `status` (text)

  3. Security
    - Enable RLS on tool_requests table
    - Add policies for:
      - Anyone can read requests
      - Authenticated users can create requests
      - Users can update/delete their own requests
*/

-- Add area_code to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS area_code text;

-- Create tool requests table
CREATE TABLE IF NOT EXISTS tool_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'open' CHECK (status IN ('open', 'fulfilled', 'closed')),
  CONSTRAINT title_length CHECK (char_length(title) >= 3)
);

-- Enable RLS
ALTER TABLE tool_requests ENABLE ROW LEVEL SECURITY;

-- Policies for tool_requests
CREATE POLICY "Anyone can read requests"
  ON tool_requests
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create requests"
  ON tool_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests"
  ON tool_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own requests"
  ON tool_requests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);