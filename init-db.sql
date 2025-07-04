-- Initialize Nicaea Heroes Database
-- This script sets up the initial database structure and configurations

-- Create sessions table for express-session storage
CREATE TABLE IF NOT EXISTS "user_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "user_sessions" ("expire");

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nicaea_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nicaea_admin;