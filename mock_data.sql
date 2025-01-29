-- Insert Developer
INSERT INTO public.developers (email, name, apikey, password)
VALUES ('automate@gmail.com', 'Automation Dev', '12345-api-key', 'securepassword')
ON CONFLICT (email) DO NOTHING;

-- Insert Application
INSERT INTO public.applications (appid, developeremail, name, description)
VALUES ('automate', 'automate@gmail.com', 'Automation Test App', 'Demo application for analytics testing')
ON CONFLICT (appid) DO NOTHING;

-- Insert Users
INSERT INTO public.users (userid, appid, firstseen, lastseen)
VALUES 
    ('user1', 'automate', NOW() - INTERVAL '2 days', NOW() - INTERVAL '10 minutes'),
    ('user2', 'automate', NOW() - INTERVAL '1 day', NOW() - INTERVAL '5 minutes'),
    ('user3', 'automate', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 hour'),
    ('user4', 'automate', NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 hours'),
    ('user5', 'automate', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 hours'),
    ('user6', 'automate', NOW() - INTERVAL '6 days', NOW() - INTERVAL '5 hours'),
    ('user7', 'automate', NOW() - INTERVAL '7 days', NOW() - INTERVAL '8 hours'),
    ('user8', 'automate', NOW() - INTERVAL '8 days', NOW() - INTERVAL '12 hours'),
    ('user9', 'automate', NOW() - INTERVAL '9 days', NOW() - INTERVAL '15 hours'),
    ('user10', 'automate', NOW() - INTERVAL '10 days', NOW() - INTERVAL '1 day'),
    ('user11', 'automate', NOW() - INTERVAL '11 days', NOW() - INTERVAL '2 days'),
    ('user12', 'automate', NOW() - INTERVAL '12 days', NOW() - INTERVAL '3 days'),
    ('user13', 'automate', NOW() - INTERVAL '13 days', NOW() - INTERVAL '4 days'),
    ('user14', 'automate', NOW() - INTERVAL '14 days', NOW() - INTERVAL '5 days'),
    ('user15', 'automate', NOW() - INTERVAL '15 days', NOW() - INTERVAL '6 days'),
    ('user16', 'automate', NOW() - INTERVAL '16 days', NOW() - INTERVAL '1 week'),
    ('user17', 'automate', NOW() - INTERVAL '17 days', NOW() - INTERVAL '8 days'),
    ('user18', 'automate', NOW() - INTERVAL '18 days', NOW() - INTERVAL '9 days'),
    ('user19', 'automate', NOW() - INTERVAL '19 days', NOW() - INTERVAL '10 days'),
    ('user20', 'automate', NOW() - INTERVAL '20 days', NOW() - INTERVAL '11 days'),
    ('user21', 'automate', NOW() - INTERVAL '21 days', NOW() - INTERVAL '12 days'),
    ('user22', 'automate', NOW() - INTERVAL '22 days', NOW() - INTERVAL '13 days'),
    ('user23', 'automate', NOW() - INTERVAL '23 days', NOW() - INTERVAL '14 days'),
    ('user24', 'automate', NOW() - INTERVAL '24 days', NOW() - INTERVAL '15 days'),
    ('user25', 'automate', NOW() - INTERVAL '25 days', NOW() - INTERVAL '16 days'),
    ('user26', 'automate', NOW() - INTERVAL '26 days', NOW() - INTERVAL '17 days'),
    ('user27', 'automate', NOW() - INTERVAL '27 days', NOW() - INTERVAL '18 days'),
    ('user28', 'automate', NOW() - INTERVAL '28 days', NOW() - INTERVAL '19 days'),
    ('user29', 'automate', NOW() - INTERVAL '29 days', NOW() - INTERVAL '20 days'),
    ('user30', 'automate', NOW() - INTERVAL '30 days', NOW() - INTERVAL '21 days')
ON CONFLICT (userid) DO NOTHING;

-- Insert Logs (User Sessions, Feature Usage, Errors, Clicks)
INSERT INTO public.logs (logid, appid, userid, logtype, timestamp, description)
VALUES 
    -- User1 activity
    (uuid_generate_v4(), 'automate', 'user1', 'UserLogin', NOW() - INTERVAL '1 hour', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user1', 'FeatureUsed', NOW() - INTERVAL '50 minutes', 'Used analytics dashboard'),
    (uuid_generate_v4(), 'automate', 'user1', 'ButtonClicked', NOW() - INTERVAL '45 minutes', 'Clicked on settings button'),
    (uuid_generate_v4(), 'automate', 'user1', 'LifeCycle', NOW() - INTERVAL '40 minutes', 'App Destroyed'),

    -- User2 activity
    (uuid_generate_v4(), 'automate', 'user2', 'UserLogin', NOW() - INTERVAL '30 minutes', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user2', 'FeatureUsed', NOW() - INTERVAL '20 minutes', 'Used heatmap feature'),
    (uuid_generate_v4(), 'automate', 'user2', 'ButtonClicked', NOW() - INTERVAL '15 minutes', 'Clicked on help button'),
    (uuid_generate_v4(), 'automate', 'user2', 'LifeCycle', NOW() - INTERVAL '10 minutes', 'App Destroyed'),

    -- User3 activity
    (uuid_generate_v4(), 'automate', 'user3', 'UserLogin', NOW() - INTERVAL '2 hours', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user3', 'FeatureUsed', NOW() - INTERVAL '1 hour 30 minutes', 'Used crash analytics'),
    (uuid_generate_v4(), 'automate', 'user3', 'Error', NOW() - INTERVAL '1 hour 15 minutes', 'App crashed: NullPointerException'),
    (uuid_generate_v4(), 'automate', 'user3', 'ButtonClicked', NOW() - INTERVAL '1 hour 10 minutes', 'Clicked retry button'),
    (uuid_generate_v4(), 'automate', 'user3', 'LifeCycle', NOW() - INTERVAL '1 hour', 'App Destroyed'),

    -- User4 activity
    (uuid_generate_v4(), 'automate', 'user4', 'UserLogin', NOW() - INTERVAL '5 hours', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user4', 'PageViewed', NOW() - INTERVAL '4 hours 30 minutes', 'Viewed analytics page'),
    (uuid_generate_v4(), 'automate', 'user4', 'ButtonClicked', NOW() - INTERVAL '4 hours', 'Clicked logout'),
    (uuid_generate_v4(), 'automate', 'user4', 'LifeCycle', NOW() - INTERVAL '3 hours 30 minutes', 'App Destroyed'),

    -- User5 activity
    (uuid_generate_v4(), 'automate', 'user5', 'UserLogin', NOW() - INTERVAL '3 hours', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user5', 'FeatureUsed', NOW() - INTERVAL '2 hours 45 minutes', 'Used settings'),
    (uuid_generate_v4(), 'automate', 'user5', 'ButtonClicked', NOW() - INTERVAL '2 hours 30 minutes', 'Clicked on profile edit'),
    (uuid_generate_v4(), 'automate', 'user5', 'SettingsChanged', NOW() - INTERVAL '2 hours', 'Updated notification preferences'),
    (uuid_generate_v4(), 'automate', 'user5', 'LifeCycle', NOW() - INTERVAL '1 hour 45 minutes', 'App Destroyed'),

    -- User6 activity
    (uuid_generate_v4(), 'automate', 'user6', 'UserLogin', NOW() - INTERVAL '8 hours', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user6', 'FeatureUsed', NOW() - INTERVAL '7 hours 30 minutes', 'Used device tracking'),
    (uuid_generate_v4(), 'automate', 'user6', 'Error', NOW() - INTERVAL '7 hours 20 minutes', 'App crashed: Memory Leak'),
    (uuid_generate_v4(), 'automate', 'user6', 'LifeCycle', NOW() - INTERVAL '7 hours', 'App Destroyed'),

    -- User7 activity
    (uuid_generate_v4(), 'automate', 'user7', 'UserLogin', NOW() - INTERVAL '12 hours', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user7', 'FeatureUsed', NOW() - INTERVAL '11 hours 30 minutes', 'Checked retention rate'),
    (uuid_generate_v4(), 'automate', 'user7', 'PageViewed', NOW() - INTERVAL '11 hours 15 minutes', 'Viewed user reports'),
    (uuid_generate_v4(), 'automate', 'user7', 'LifeCycle', NOW() - INTERVAL '11 hours', 'App Destroyed'),

    -- User8 activity
    (uuid_generate_v4(), 'automate', 'user8', 'UserLogin', NOW() - INTERVAL '1 day', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user8', 'ButtonClicked', NOW() - INTERVAL '23 hours 30 minutes', 'Clicked dark mode toggle'),
    (uuid_generate_v4(), 'automate', 'user8', 'SettingsChanged', NOW() - INTERVAL '23 hours', 'Enabled dark mode'),
    (uuid_generate_v4(), 'automate', 'user8', 'LifeCycle', NOW() - INTERVAL '22 hours 30 minutes', 'App Destroyed'),

    -- User9 activity
    (uuid_generate_v4(), 'automate', 'user9', 'UserLogin', NOW() - INTERVAL '3 days', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user9', 'FeatureUsed', NOW() - INTERVAL '2 days 20 hours', 'Used user segmentation'),
    (uuid_generate_v4(), 'automate', 'user9', 'Error', NOW() - INTERVAL '2 days 18 hours', 'App crashed: Connection timeout'),
    (uuid_generate_v4(), 'automate', 'user9', 'LifeCycle', NOW() - INTERVAL '2 days 16 hours', 'App Destroyed'),

    -- User10 activity
    (uuid_generate_v4(), 'automate', 'user10', 'UserLogin', NOW() - INTERVAL '7 days', 'User logged in'),
    (uuid_generate_v4(), 'automate', 'user10', 'FeatureUsed', NOW() - INTERVAL '6 days 12 hours', 'Used data export'),
    (uuid_generate_v4(), 'automate', 'user10', 'DataExport', NOW() - INTERVAL '6 days 10 hours', 'Exported user activity report'),
    (uuid_generate_v4(), 'automate', 'user10', 'LifeCycle', NOW() - INTERVAL '6 days 8 hours', 'App Destroyed')

ON CONFLICT DO NOTHING;

-- Insert App Ratings
INSERT INTO public.appratings (ratingid, appid, userid, rating, comment, timestamp)
VALUES 
    (gen_random_uuid(), 'automate', 'user1', 5, 'Great app for analytics!', NOW() - INTERVAL '1 day'),
    (gen_random_uuid(), 'automate', 'user2', 4, 'Good, but needs improvements.', NOW() - INTERVAL '2 days'),
    (gen_random_uuid(), 'automate', 'user3', 3, 'Okay, found some bugs.', NOW() - INTERVAL '3 days'),
    (gen_random_uuid(), 'automate', 'user4', 5, 'Amazing, love the heatmaps!', NOW() - INTERVAL '4 days'),
    (gen_random_uuid(), 'automate', 'user5', 1, 'Amazing, love the heatmaps!', NOW() - INTERVAL '4 days'),
    (gen_random_uuid(), 'automate', 'user6', 2, 'Amazing, love the heatmaps!', NOW() - INTERVAL '4 days')
    
ON CONFLICT DO NOTHING;

-- Insert Geographical Analytics (Mock Location Data)
INSERT INTO public.geographical_analytics (geo_id, app_id, user_id, latitude, longitude, country, timestamp)
VALUES 
    (uuid_generate_v4(), 'automate', 'user1', 40.712776, -74.005974, 'US', NOW() - INTERVAL '1 hour'),
    (uuid_generate_v4(), 'automate', 'user2', 34.052235, -118.243683, 'US', NOW() - INTERVAL '1 hour'),
    (uuid_generate_v4(), 'automate', 'user3', 31.0461, 34.8516, 'IL', NOW() - INTERVAL '1 hour'),
    (uuid_generate_v4(), 'automate', 'user4', 31.0461, 34.8516, 'IL', NOW() - INTERVAL '30 minutes'),
    (uuid_generate_v4(), 'automate', 'user5', 48.856613, 2.352222, 'FR', NOW() - INTERVAL '2 hours'),
    (uuid_generate_v4(), 'automate', 'user6', 35.689487, 139.691711, 'JP', NOW() - INTERVAL '5 hours'),
    (uuid_generate_v4(), 'automate', 'user7', -33.868820, 151.209290, 'AU', NOW() - INTERVAL '3 hours'),
    (uuid_generate_v4(), 'automate', 'user8', -23.550520, -46.633308, 'BR', NOW() - INTERVAL '4 hours'),
    (uuid_generate_v4(), 'automate', 'user9', 55.755825, 37.617298, 'RU', NOW() - INTERVAL '6 hours'),
    (uuid_generate_v4(), 'automate', 'user10', 39.904202, 116.407394, 'CN', NOW() - INTERVAL '8 hours'),
    (uuid_generate_v4(), 'automate', 'user11', 41.902782, 12.496366, 'IT', NOW() - INTERVAL '7 hours'),
    (uuid_generate_v4(), 'automate', 'user12', 19.432608, -99.133209, 'MX', NOW() - INTERVAL '9 hours'),
    (uuid_generate_v4(), 'automate', 'user13', 37.774929, -122.419418, 'US', NOW() - INTERVAL '10 hours'),
    (uuid_generate_v4(), 'automate', 'user14', 52.520008, 13.404954, 'DE', NOW() - INTERVAL '12 hours'),
    (uuid_generate_v4(), 'automate', 'user15', 28.613939, 77.209023, 'IN', NOW() - INTERVAL '14 hours'),
    (uuid_generate_v4(), 'automate', 'user16', 55.953251, -3.188267, 'UK', NOW() - INTERVAL '15 hours'),
    (uuid_generate_v4(), 'automate', 'user17', 59.329323, 18.068581, 'SE', NOW() - INTERVAL '16 hours'),
    (uuid_generate_v4(), 'automate', 'user18', 50.110924, 8.682127, 'DE', NOW() - INTERVAL '18 hours'),
    (uuid_generate_v4(), 'automate', 'user19', 40.416775, -3.703790, 'ES', NOW() - INTERVAL '20 hours'),
    (uuid_generate_v4(), 'automate', 'user20', -26.204103, 28.047305, 'ZA', NOW() - INTERVAL '22 hours'),
    (uuid_generate_v4(), 'automate', 'user21', 45.464664, 9.188540, 'IT', NOW() - INTERVAL '1 day'),
    (uuid_generate_v4(), 'automate', 'user22', -37.813629, 144.963058, 'AU', NOW() - INTERVAL '1 day 2 hours'),
    (uuid_generate_v4(), 'automate', 'user23', 48.135124, 11.581981, 'DE', NOW() - INTERVAL '1 day 4 hours'),
    (uuid_generate_v4(), 'automate', 'user24', 35.676193, 139.650311, 'JP', NOW() - INTERVAL '1 day 6 hours'),
    (uuid_generate_v4(), 'automate', 'user25', 43.651070, -79.347015, 'CA', NOW() - INTERVAL '1 day 8 hours'),
    (uuid_generate_v4(), 'automate', 'user26', 37.566536, 126.977966, 'KR', NOW() - INTERVAL '1 day 12 hours'),
    (uuid_generate_v4(), 'automate', 'user27', -34.603722, -58.381592, 'AR', NOW() - INTERVAL '1 day 14 hours'),
    (uuid_generate_v4(), 'automate', 'user28', 53.349805, -6.260310, 'IE', NOW() - INTERVAL '1 day 18 hours'),
    (uuid_generate_v4(), 'automate', 'user29', 25.276987, 55.296249, 'AE', NOW() - INTERVAL '2 days'),
    (uuid_generate_v4(), 'automate', 'user30', 59.913869, 10.752245, 'NO', NOW() - INTERVAL '2 days 5 hours')
ON CONFLICT DO NOTHING;