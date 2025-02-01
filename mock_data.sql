-- Insert Developer
INSERT INTO public.developers (email, name, apikey, password)
VALUES ('mockdata@gmail.com', 'Automation Dev', '12345-api-key', '123456')
ON CONFLICT (email) DO NOTHING;

-- Insert Application
INSERT INTO public.applications (appid, developeremail, name, description)
VALUES ('mockdata', 'mockdata@gmail.com', 'Mock App', 'Demo application for analytics testing')
ON CONFLICT (appid) DO NOTHING;

-- Insert 300 Users (Updated lastseen logic)
INSERT INTO public.users (userid, appid, firstseen, lastseen)
SELECT 
    'user' || generate_series(1, 600) AS userid,
    'mockdata' AS appid,
    NOW() - (INTERVAL '6 months' * random()) AS firstseen,
    NOW() - (INTERVAL '3 months' * random()) AS lastseen
ON CONFLICT (userid) DO NOTHING;

-- Ensure lastseen is after firstseen
UPDATE public.users 
SET lastseen = firstseen + (random() * (NOW() - INTERVAL '3 months' - firstseen))
WHERE appid = 'mockdata';

-- Insert 5000 UserLogin logs spanning 6 months
INSERT INTO public.logs (logid, appid, userid, logtype, timestamp, description)
SELECT 
    uuid_generate_v4(),
    'mockdata',
    'user' || (1 + trunc(random() * 300))::int,
    'UserLogin',
    NOW() - (INTERVAL '6 months' * random()), 
    'User logged in'
FROM generate_series(1, 5000)
ON CONFLICT DO NOTHING;


INSERT INTO public.logs (logid, appid, userid, logtype, timestamp, description)
SELECT 
    uuid_generate_v4(),
    'mockdata',
    'user' || (1 + floor(random() * 300))::int,
    (ARRAY[
        'FeatureUsed'::log_type_enum, 
        'ButtonClicked'::log_type_enum, 
        'Crash'::log_type_enum, 
        'Other'::log_type_enum, 
        'LifeCycle'::log_type_enum
    ])[floor(random() * 5) + 1],
    NOW() - (INTERVAL '6 months' * random()),
    'Random event logged'
FROM generate_series(1, 2000)
ON CONFLICT DO NOTHING;


-- Insert 150 Ratings for the app
INSERT INTO public.appratings (ratingid, appid, userid, rating, comment, timestamp)
SELECT 
    uuid_generate_v4(),
    'mockdata',
    'user' || (1 + trunc(random() * 300))::int,
    (ARRAY[1, 2, 3, 4, 5])[floor(random() * 5) + 1],
    (ARRAY['Great app!', 'Needs improvements', 'Found some bugs', 'Excellent UI', 'Terrible experience'])[floor(random() * 5) + 1],
    NOW() - (INTERVAL '6 months' * random())
FROM generate_series(1, 150)
ON CONFLICT DO NOTHING;

-- Insert 1000 geographical analytics logs
INSERT INTO public.geographical_analytics (geo_id, app_id, user_id, latitude, longitude, country, timestamp)
SELECT 
    uuid_generate_v4(), -- Generate a new UUID for geo_id
    u.appid,  
    u.userid, 
    (ARRAY[40.712776, 34.052235, 31.0461, 48.856613, -33.868820, 55.755825, 35.689487, -23.550520, 52.520008, 28.613939])[floor(random() * 10) + 1],
    (ARRAY[-74.005974, -118.243683, 34.8516, 2.352222, 151.209290, 37.617298, 139.691711, -46.633308, 13.404954, 77.209023])[floor(random() * 10) + 1],
    (ARRAY['US', 'US', 'IL', 'FR', 'AU', 'RU', 'JP', 'BR', 'DE', 'IN'])[floor(random() * 10) + 1],
    NOW() - (INTERVAL '6 months' * random())
FROM public.users u
WHERE u.appid = 'mockdata'
ON CONFLICT (geo_id) DO NOTHING;


-- Insert 5000 PageViewed logs spanning 6 months
INSERT INTO public.logs (logid, appid, userid, logtype, timestamp, description)
SELECT 
    uuid_generate_v4(),
    'mockdata',
    'user' || (1 + trunc(random() * 300))::int,
    'PageViewed',
    NOW() - (INTERVAL '6 months' * random()), 
    (ARRAY['MainActivity', 'GameActivity', 'SettingsActivity'])[floor(random() * 3) + 1]
FROM generate_series(1, 1000)
ON CONFLICT DO NOTHING;
