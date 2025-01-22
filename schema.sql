--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: schema.sql; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "schema.sql";


ALTER SCHEMA "schema.sql" OWNER TO postgres;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: log_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.log_type_enum AS ENUM (
    'Crash',
    'DailyLogin',
    'Error',
    'Other'
);


ALTER TYPE public.log_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applications (
    appid text NOT NULL,
    developeremail text,
    name text NOT NULL,
    description text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.applications OWNER TO postgres;

--
-- Name: appratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appratings (
    ratingid uuid DEFAULT gen_random_uuid() NOT NULL,
    appid text,
    userid text,
    rating integer,
    comment text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT appratings_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.appratings OWNER TO postgres;

--
-- Name: developers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.developers (
    email text NOT NULL,
    name text NOT NULL,
    apikey text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.developers OWNER TO postgres;

--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    logid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    appid text,
    userid text,
    logtype public.log_type_enum NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid text NOT NULL,
    appid text,
    firstseen timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    lastseen timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (appid);


--
-- Name: appratings appratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appratings
    ADD CONSTRAINT appratings_pkey PRIMARY KEY (ratingid);


--
-- Name: developers developers_apikey_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_apikey_key UNIQUE (apikey);


--
-- Name: developers developers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (email);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (logid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: applications applications_developeremail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_developeremail_fkey FOREIGN KEY (developeremail) REFERENCES public.developers(email) ON DELETE CASCADE;


--
-- Name: appratings appratings_appid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appratings
    ADD CONSTRAINT appratings_appid_fkey FOREIGN KEY (appid) REFERENCES public.applications(appid) ON DELETE CASCADE;


--
-- Name: appratings appratings_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appratings
    ADD CONSTRAINT appratings_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: logs logs_appid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_appid_fkey FOREIGN KEY (appid) REFERENCES public.applications(appid);


--
-- Name: logs logs_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- Name: users users_appid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_appid_fkey FOREIGN KEY (appid) REFERENCES public.applications(appid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


