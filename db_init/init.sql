-- Ensure uuid-ossp extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure log_type_enum exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'log_type_enum') THEN
        CREATE TYPE public.log_type_enum AS ENUM (
            'Crash',
            'DailyLogin',
            'Error',
            'Other',
            'DataExport',
            'LifeCycle',
            'UserLogin',
            'UserLogout',
            'AccountLocked',
            'FeatureUsed',
            'SettingsChanged',
            'AccessDenied',
            'APIRequestFailed',
            'ButtonClicked',
            'PageViewed'
        );
    END IF;
END $$;

-- Create Developers Table (NOW INCLUDED)
CREATE TABLE IF NOT EXISTS public.developers (
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    apikey TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Create Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    appid TEXT PRIMARY KEY,
    developeremail TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_developer FOREIGN KEY (developeremail) REFERENCES public.developers(email) ON DELETE CASCADE
);

-- Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
    userid TEXT PRIMARY KEY,
    appid TEXT NOT NULL,
    firstseen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastseen TIMESTAMP,
    CONSTRAINT fk_users_app FOREIGN KEY (appid) REFERENCES public.applications(appid) ON DELETE CASCADE
);

-- Create Logs Table
CREATE TABLE IF NOT EXISTS public.logs (
    logid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    appid TEXT NOT NULL,
    userid TEXT,
    logtype public.log_type_enum NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    CONSTRAINT fk_logs_app FOREIGN KEY (appid) REFERENCES public.applications(appid) ON DELETE CASCADE,
    CONSTRAINT fk_logs_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE SET NULL
);

-- Create App Ratings Table
CREATE TABLE IF NOT EXISTS public.appratings (
    ratingid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    appid TEXT NOT NULL,
    userid TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ratings_app FOREIGN KEY (appid) REFERENCES public.applications(appid) ON DELETE CASCADE,
    CONSTRAINT fk_ratings_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS geographical_analytics (
    geo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,  -- Latitude (-90 to 90)
    longitude DECIMAL(9,6) NOT NULL, -- Longitude (-180 to 180)
    country TEXT NOT NULL,           -- Country name (e.g., "United States")
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_geo_app FOREIGN KEY (app_id) REFERENCES applications(appid) ON DELETE CASCADE,
    CONSTRAINT fk_geo_user FOREIGN KEY (user_id) REFERENCES users(userid) ON DELETE CASCADE
);