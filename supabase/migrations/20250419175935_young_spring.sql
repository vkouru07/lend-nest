/*
  # Fix profile trigger function

  Updates the handle_new_user trigger function to properly save all profile fields from auth metadata
*/

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    neighborhood,
    area_code,
    avatar_url,
    tools_contributed,
    tools_borrowed
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'neighborhood', ''),
    COALESCE(new.raw_user_meta_data->>'area_code', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    0,
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;

-- Drop and recreate the trigger to ensure it's using the latest version
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();