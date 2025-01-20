/*
  # Create test user account

  1. Changes
    - Creates a test user account with email 'testuser1' and password 'testpass1'
    - Uses proper auth.users schema with all required fields
    - Ensures idempotent insertion
    
  2. Security
    - User is created with a secure password hash
    - Email verification is disabled for testing purposes
*/

-- Create the test user if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'testuser1'
  ) THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    ) VALUES (
      gen_random_uuid(),
      'testuser1',
      crypt('testpass1', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      'authenticated',
      'authenticated'
    );
  END IF;
END $$;